import axios from "axios"
import { IOrderModuleService } from "@medusajs/framework/types"

/**
 * WhatsApp Service Configuration
 */
export interface WhatsAppConfig {
    apiKey: string
    apiUrl: string
    languageCode: string
    headerImageUrl: string
}

/**
 * WhatsApp Message Template
 */
export interface WhatsAppTemplate {
    templateName: string
    bodyParameters: Array<{
        type: string
        text: string
    }>
    headerType?: "image" | "text"
    headerText?: string
    headerImageUrl?: string
}

/**
 * WhatsApp API Response
 */
export interface WhatsAppResponse {
    ErrorCode: string
    ErrorMessage?: string
    MessageId?: string
    [key: string]: any
}

/**
 * Mobile Number Extraction Result
 */
export interface MobileNumberResult {
    mobileNumber: string | null
    source: "email" | "shipping_address" | "billing_address" | null
    isValid: boolean
}

/**
 * Order Notification Status
 */
export interface NotificationStatus {
    status: "success" | "failed"
    error?: string
    timestamp?: string
}

/**
 * WhatsApp Service Class
 */
export class WhatsAppService {
    private config: WhatsAppConfig

    constructor(config: WhatsAppConfig) {
        this.config = config
    }

    /**
     * Extract mobile number from order data
     */
    static extractMobileNumber(order: any): MobileNumberResult {
        // Try to extract from email format (e.g., 7354657459@fitfusion.com)
        if (order?.email && order.email.includes('@fitfusion.com')) {
            const extractedNumber = order.email.split('@')[0]
            if (/^\d{10}$/.test(extractedNumber)) {
                return {
                    mobileNumber: extractedNumber,
                    source: "email",
                    isValid: true
                }
            }
        }

        // Try shipping address
        if (order?.shipping_address?.phone) {
            const cleanPhone = order.shipping_address.phone.replace(/\D/g, '')
            if (/^\d{10}$/.test(cleanPhone)) {
                return {
                    mobileNumber: cleanPhone,
                    source: "shipping_address",
                    isValid: true
                }
            }
        }

        // Try billing address
        if (order?.billing_address?.phone) {
            const cleanPhone = order.billing_address.phone.replace(/\D/g, '')
            if (/^\d{10}$/.test(cleanPhone)) {
                return {
                    mobileNumber: cleanPhone,
                    source: "billing_address",
                    isValid: true
                }
            }
        }

        return {
            mobileNumber: null,
            source: null,
            isValid: false
        }
    }

    /**
     * Send WhatsApp message using template
     */
    async sendTemplateMessage(
        mobileNumber: string,
        template: WhatsAppTemplate
    ): Promise<WhatsAppResponse> {
        const body = {
            key: this.config.apiKey,
            to: mobileNumber,
            languageCode: this.config.languageCode,
            TemplateName: template.templateName,
            headertype: template.headerType || "image",
            link: template.headerImageUrl || this.config.headerImageUrl,
            filename: "",
            headertext: template.headerText || "",
            BodyParameter: template.bodyParameters,
        }

        const response = await axios.post(
            this.config.apiUrl,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        return response.data
    }

    /**
     * Check if WhatsApp response indicates success
     */
    static isSuccessResponse(response: WhatsAppResponse): boolean {
        return response.ErrorCode === "000"
    }

    /**
     * Get error message from WhatsApp response
     */
    static getErrorMessage(response: WhatsAppResponse): string {
        return response.ErrorMessage || "Unknown WhatsApp API error"
    }

    /**
     * Create order placed template
     */
    static createOrderPlacedTemplate(orderId: string): WhatsAppTemplate {
        return {
            templateName: "appointment",
            bodyParameters: [
                { type: "text", text: orderId },
                { type: "text", text: `/${orderId}` },
            ],
            headerType: "image"
        }
    }

    /**
     * Create order cancelled template
     */
    static createOrderCancelledTemplate(orderId: string, reason?: string): WhatsAppTemplate {
        return {
            templateName: "appointment", // You may need to create this template
            bodyParameters: [
                { type: "text", text: orderId },
                { type: "text", text: reason || "Order cancelled" },
            ],
            headerType: "image"
        }
    }

    /**
     * Create order completed template
     */
    static createOrderCompletedTemplate(orderId: string): WhatsAppTemplate {
        return {
            templateName: "appointment", // You may need to create this template
            bodyParameters: [
                { type: "text", text: orderId },
                { type: "text", text: "Your order has been completed successfully!" },
            ],
            headerType: "image"
        }
    }

    /**
     * Create shipment created template
     */
    static createShipmentCreatedTemplate(orderId: string, trackingNumber?: string): WhatsAppTemplate {
        return {
            templateName: "appointment", // You may need to create this template
            bodyParameters: [
                { type: "text", text: orderId },
                { type: "text", text: trackingNumber || "Your order has been shipped!" },
            ],
            headerType: "image"
        }
    }

    /**
     * Create appointment template
     */
    static createAppointmentTemplate(patientName: string, meetingLink: string): WhatsAppTemplate {
        return {
            templateName: "appointment",
            bodyParameters: [
                { type: "text", text: patientName },
                { type: "text", text: meetingLink },
            ],
            headerType: "image"
        }
    }

    /**
     * Create cart abandonment first notification template
     */
    static createCartAbandonmentFirstTemplate(customerName: string, cartId: string): WhatsAppTemplate {
        return {
            templateName: "cart_abandonment_first",
            bodyParameters: [
                { type: "text", text: customerName },
                { type: "text", text: cartId },
                { type: "text", text: `/${cartId}` }
            ],
            headerType: "image"
        }
    }

    /**
     * Create cart abandonment second notification template
     */
    static createCartAbandonmentSecondTemplate(customerName: string, cartId: string): WhatsAppTemplate {
        return {
            templateName: "cart_abandonment_second",
            bodyParameters: [
                { type: "text", text: customerName },
                { type: "text", text: cartId },
                { type: "text", text: `/${cartId}` }
            ],
            headerType: "image"
        }
    }
}

/**
 * Order Notification Service
 */
export class OrderNotificationService {
    constructor(private orderService: IOrderModuleService) { }

    /**
     * Update order metadata with notification status
     */
    async updateNotificationStatus(
        orderId: string,
        notificationType: string,
        status: NotificationStatus
    ): Promise<void> {
        const metadata = {
            [`${notificationType}_status`]: status.status,
            [`${notificationType}_timestamp`]: status.timestamp || new Date().toISOString(),
        }

        if (status.error) {
            metadata[`${notificationType}_error`] = status.error
        }

        await this.orderService.updateOrders(orderId, {
            metadata
        })
    }

    /**
     * Get notification status from order metadata
     */
    getNotificationStatus(order: any, notificationType: string): NotificationStatus | null {
        const status = order.metadata?.[`${notificationType}_status`]
        if (!status) return null

        return {
            status,
            error: order.metadata?.[`${notificationType}_error`],
            timestamp: order.metadata?.[`${notificationType}_timestamp`]
        }
    }
}

/**
 * Default WhatsApp configuration
 */
export const DEFAULT_WHATSAPP_CONFIG: WhatsAppConfig = {
    apiKey: "5b3acc6fcb52468091f9792a1543d444",
    apiUrl: "https://waba2waba.com/api/v1/sendTemplateMessage",
    languageCode: "en",
    headerImageUrl: "https://www.xyz.com//Files/b4063f333fdec6.jpeg"
}

/**
 * Create WhatsApp service instance with default config
 */
export function createWhatsAppService(config?: Partial<WhatsAppConfig>): WhatsAppService {
    return new WhatsAppService({
        ...DEFAULT_WHATSAPP_CONFIG,
        ...config
    })
}
