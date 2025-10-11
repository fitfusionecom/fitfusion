import { ICartModuleService } from "@medusajs/framework/types"
import { WhatsAppService, createWhatsAppService } from "./whatsapp-service"

/**
 * Cart Abandonment Notification Status
 */
export interface CartNotificationStatus {
    firstSent: boolean
    secondSent: boolean
    firstSentAt?: string
    secondSentAt?: string
}

/**
 * Cart Abandonment Service Configuration
 */
export interface CartAbandonmentConfig {
    batchSize: number
    firstNotificationDelayHours: number
    secondNotificationDelayHours: number
    enableWhatsApp: boolean
    enableEmail: boolean
}

/**
 * Cart Processing Result
 */
export interface CartProcessingResult {
    processed: number
    firstNotificationsSent: number
    secondNotificationsSent: number
    errors: number
    nextCursor?: string
}

/**
 * Cart Abandonment Service
 * 
 * Handles cart abandonment notifications using cursor-based batch processing
 */
export class CartAbandonmentService {
    private cartService: ICartModuleService
    private config: CartAbandonmentConfig
    private whatsappService?: WhatsAppService

    constructor(
        cartService: ICartModuleService,
        config: Partial<CartAbandonmentConfig> = {}
    ) {
        this.cartService = cartService
        this.config = {
            batchSize: 100,
            firstNotificationDelayHours: 24,
            secondNotificationDelayHours: 48,
            enableWhatsApp: true,
            enableEmail: false,
            ...config
        }

        if (this.config.enableWhatsApp) {
            this.whatsappService = createWhatsAppService()
        }
    }

    /**
     * Get notification status from cart metadata
     */
    getNotificationStatus(cart: any): CartNotificationStatus {
        const notifications = cart.metadata?.notifications || {}

        return {
            firstSent: notifications.firstSent === true,
            secondSent: notifications.secondSent === true,
            firstSentAt: notifications.firstSentAt,
            secondSentAt: notifications.secondSentAt
        }
    }

    /**
     * Update cart metadata with notification status
     */
    async updateNotificationStatus(
        cartId: string,
        notificationType: 'first' | 'second',
        status: 'sent' | 'failed',
        error?: string
    ): Promise<void> {
        const cart = await this.cartService.retrieveCart(cartId)
        const currentNotifications = cart.metadata?.notifications || {}

        const updatedNotifications = {
            ...currentNotifications,
            [`${notificationType}Sent`]: status === 'sent',
            [`${notificationType}SentAt`]: status === 'sent' ? new Date().toISOString() : undefined,
            [`${notificationType}Error`]: error
        }

        await this.cartService.updateCarts(cartId, {
            metadata: {
                ...cart.metadata,
                notifications: updatedNotifications
            }
        })
    }

    /**
     * Check if cart is eligible for first notification
     */
    isEligibleForFirstNotification(cart: any): boolean {
        const notificationStatus = this.getNotificationStatus(cart)

        // Already sent first notification
        if (notificationStatus.firstSent) {
            return false
        }

        // Cart must be active (not completed)
        if (cart.completed_at) {
            return false
        }

        // Cart must have items
        if (!cart.items || cart.items.length === 0) {
            return false
        }

        // Check if enough time has passed since cart creation
        const cartCreatedAt = new Date(cart.created_at)
        const now = new Date()
        const hoursSinceCreation = (now.getTime() - cartCreatedAt.getTime()) / (1000 * 60 * 60)

        return hoursSinceCreation >= this.config.firstNotificationDelayHours
    }

    /**
     * Check if cart is eligible for second notification
     */
    isEligibleForSecondNotification(cart: any): boolean {
        const notificationStatus = this.getNotificationStatus(cart)

        // Must have sent first notification
        if (!notificationStatus.firstSent) {
            return false
        }

        // Already sent second notification
        if (notificationStatus.secondSent) {
            return false
        }

        // Cart must be active (not completed)
        if (cart.completed_at) {
            return false
        }

        // Cart must have items
        if (!cart.items || cart.items.length === 0) {
            return false
        }

        // Check if enough time has passed since first notification
        if (!notificationStatus.firstSentAt) {
            return false
        }

        const firstSentAt = new Date(notificationStatus.firstSentAt)
        const now = new Date()
        const hoursSinceFirstNotification = (now.getTime() - firstSentAt.getTime()) / (1000 * 60 * 60)

        return hoursSinceFirstNotification >= this.config.secondNotificationDelayHours
    }

    /**
     * Extract mobile number from cart data
     */
    extractMobileNumber(cart: any): { mobileNumber: string | null; isValid: boolean } {
        // Try to extract from email format (e.g., 7354657459@fitfusion.com)
        if (cart?.email && cart.email.includes('@fitfusion.com')) {
            const extractedNumber = cart.email.split('@')[0]
            if (/^\d{10}$/.test(extractedNumber)) {
                return {
                    mobileNumber: extractedNumber,
                    isValid: true
                }
            }
        }

        // Try shipping address
        if (cart?.shipping_address?.phone) {
            const cleanPhone = cart.shipping_address.phone.replace(/\D/g, '')
            if (/^\d{10}$/.test(cleanPhone)) {
                return {
                    mobileNumber: cleanPhone,
                    isValid: true
                }
            }
        }

        // Try billing address
        if (cart?.billing_address?.phone) {
            const cleanPhone = cart.billing_address.phone.replace(/\D/g, '')
            if (/^\d{10}$/.test(cleanPhone)) {
                return {
                    mobileNumber: cleanPhone,
                    isValid: true
                }
            }
        }

        return {
            mobileNumber: null,
            isValid: false
        }
    }

    /**
     * Create cart abandonment WhatsApp template
     */
    createCartAbandonmentTemplate(
        cartId: string,
        notificationType: 'first' | 'second',
        customerName?: string
    ) {
        const name = customerName || "Customer"

        if (notificationType === 'first') {
            return WhatsAppService.createCartAbandonmentFirstTemplate(name, cartId)
        } else {
            return WhatsAppService.createCartAbandonmentSecondTemplate(name, cartId)
        }
    }

    /**
     * Send cart abandonment notification
     */
    async sendCartAbandonmentNotification(
        cart: any,
        notificationType: 'first' | 'second'
    ): Promise<{ success: boolean; error?: string }> {
        try {
            // Extract mobile number
            const mobileResult = this.extractMobileNumber(cart)

            if (!mobileResult.isValid || !mobileResult.mobileNumber) {
                return {
                    success: false,
                    error: "No valid mobile number found"
                }
            }

            // Create and send WhatsApp message
            if (this.whatsappService) {
                const template = this.createCartAbandonmentTemplate(
                    cart.id,
                    notificationType,
                    cart.customer?.first_name || cart.email?.split('@')[0]
                )

                const response = await this.whatsappService.sendTemplateMessage(
                    mobileResult.mobileNumber,
                    template
                )

                if (!WhatsAppService.isSuccessResponse(response)) {
                    return {
                        success: false,
                        error: WhatsAppService.getErrorMessage(response)
                    }
                }
            }

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error)
            }
        }
    }

    /**
     * Process carts in batches using cursor-based pagination
     */
    async processCartsBatch(cursor?: string): Promise<CartProcessingResult> {
        const result: CartProcessingResult = {
            processed: 0,
            firstNotificationsSent: 0,
            secondNotificationsSent: 0,
            errors: 0,
            nextCursor: undefined
        }

        try {
            // Fetch carts in batch - using basic listCarts and manual pagination
            const allCarts = await this.cartService.listCarts({})

            // Apply cursor-based pagination manually
            let startIndex = 0
            if (cursor) {
                const cursorIndex = allCarts.findIndex(cart => cart.id === cursor)
                startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0
            }

            const endIndex = Math.min(startIndex + this.config.batchSize, allCarts.length)
            const carts = allCarts.slice(startIndex, endIndex)

            // Set next cursor if there are more carts
            result.nextCursor = endIndex < allCarts.length ? carts[carts.length - 1]?.id : undefined

            for (const cart of carts) {
                result.processed++

                try {
                    // Check for first notification
                    if (this.isEligibleForFirstNotification(cart)) {
                        const notificationResult = await this.sendCartAbandonmentNotification(cart, 'first')

                        if (notificationResult.success) {
                            await this.updateNotificationStatus(cart.id, 'first', 'sent')
                            result.firstNotificationsSent++
                        } else {
                            await this.updateNotificationStatus(cart.id, 'first', 'failed', notificationResult.error)
                            result.errors++
                        }
                    }

                    // Check for second notification
                    if (this.isEligibleForSecondNotification(cart)) {
                        const notificationResult = await this.sendCartAbandonmentNotification(cart, 'second')

                        if (notificationResult.success) {
                            await this.updateNotificationStatus(cart.id, 'second', 'sent')
                            result.secondNotificationsSent++
                        } else {
                            await this.updateNotificationStatus(cart.id, 'second', 'failed', notificationResult.error)
                            result.errors++
                        }
                    }
                } catch (error) {
                    result.errors++
                    console.error(`Error processing cart ${cart.id}:`, error)
                }
            }

        } catch (error) {
            console.error('Error in processCartsBatch:', error)
            result.errors++
        }

        return result
    }

    /**
     * Process all carts using cursor-based pagination
     */
    async processAllCarts(): Promise<CartProcessingResult> {
        const totalResult: CartProcessingResult = {
            processed: 0,
            firstNotificationsSent: 0,
            secondNotificationsSent: 0,
            errors: 0
        }

        let cursor: string | undefined = undefined
        let hasMore = true

        while (hasMore) {
            const batchResult = await this.processCartsBatch(cursor)

            // Accumulate results
            totalResult.processed += batchResult.processed
            totalResult.firstNotificationsSent += batchResult.firstNotificationsSent
            totalResult.secondNotificationsSent += batchResult.secondNotificationsSent
            totalResult.errors += batchResult.errors

            // Check if there are more carts to process
            cursor = batchResult.nextCursor
            hasMore = !!cursor && batchResult.processed > 0

            // Add a small delay between batches to avoid overwhelming the system
            if (hasMore) {
                await new Promise(resolve => setTimeout(resolve, 100))
            }
        }

        return totalResult
    }
}

/**
 * Default cart abandonment configuration
 */
export const DEFAULT_CART_ABANDONMENT_CONFIG: CartAbandonmentConfig = {
    batchSize: 100,
    firstNotificationDelayHours: 24,
    secondNotificationDelayHours: 48,
    enableWhatsApp: true,
    enableEmail: false
}

/**
 * Create cart abandonment service instance
 */
export function createCartAbandonmentService(
    cartService: ICartModuleService,
    config?: Partial<CartAbandonmentConfig>
): CartAbandonmentService {
    return new CartAbandonmentService(cartService, config)
}
