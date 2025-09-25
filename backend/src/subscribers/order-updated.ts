import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import {
    WhatsAppService,
    OrderNotificationService,
    createWhatsAppService
} from "../utils/whatsapp-service"


/**
 * Order Updated Subscriber
 * 
 * Handles order.updated events and sends WhatsApp notifications for status changes
 */

export default async function orderUpdatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const logger = container.resolve("logger")
    const orderService: IOrderModuleService = container.resolve(Modules.ORDER)

    try {
        logger.info(`Order updated event received for order ${data.id}`)

        // Fetch the updated order details
        const order = await orderService.retrieveOrder(data.id, {
            relations: ["shipping_address", "billing_address"]
        })

        logger.info(`Updated order details: ${order.id}, status: ${order.status}, total: ${order.total}`)

        // Send WhatsApp notification for significant status changes
        try {
            const mobileResult = WhatsAppService.extractMobileNumber(order)

            if (mobileResult.isValid && mobileResult.mobileNumber) {
                // Only send notifications for certain status changes
                const shouldNotify = shouldSendStatusNotification(order.status)

                if (shouldNotify) {
                    logger.info(`Sending WhatsApp status update notification to ${mobileResult.mobileNumber}`)

                    const whatsappService = createWhatsAppService()
                    const template = createStatusUpdateTemplate(order.id, order.status)

                    const response = await whatsappService.sendTemplateMessage(
                        mobileResult.mobileNumber,
                        template
                    )

                    if (WhatsAppService.isSuccessResponse(response)) {
                        logger.info(`WhatsApp status update notification sent successfully for order ${order.id}`)

                        // Update notification status
                        const notificationService = new OrderNotificationService(orderService)
                        await notificationService.updateNotificationStatus(
                            order.id,
                            "wa_status_update_notification",
                            { status: "success" }
                        )
                    } else {
                        const errorMessage = WhatsAppService.getErrorMessage(response)
                        logger.error(`Failed to send WhatsApp status update notification: ${errorMessage}`)

                        // Update notification status
                        const notificationService = new OrderNotificationService(orderService)
                        await notificationService.updateNotificationStatus(
                            order.id,
                            "wa_status_update_notification",
                            { status: "failed", error: errorMessage }
                        )
                    }
                }
            } else {
                logger.warn(`No valid mobile number found for status update notification: ${order.id}`)
            }
        } catch (whatsappError) {
            logger.error(`Error sending WhatsApp status update notification for order ${order.id}:`, whatsappError)

            // Update notification status
            try {
                const notificationService = new OrderNotificationService(orderService)
                await notificationService.updateNotificationStatus(
                    order.id,
                    "wa_status_update_notification",
                    {
                        status: "failed",
                        error: whatsappError instanceof Error ? whatsappError.message : String(whatsappError)
                    }
                )
            } catch (metadataError) {
                logger.error(`Failed to update notification metadata for order ${order.id}:`, metadataError)
            }
        }

    } catch (error) {
        logger.error(`Error processing order updated event for order ${data.id}:`, error)
        // Don't throw error to prevent order processing failure
    }
}

/**
 * Determine if we should send a notification for this status change
 */
function shouldSendStatusNotification(status: string): boolean {
    // Only send notifications for significant status changes
    const notifyStatuses = [
        "payment_required",
        "payment_captured",
        "requires_action",
        "partially_fulfilled",
        "partially_shipped",
        "shipped",
        "partially_returned",
        "returned",
        "canceled",
        "requires_action"
    ]

    return notifyStatuses.includes(status)
}

/**
 * Create appropriate template based on order status
 */
function createStatusUpdateTemplate(orderId: string, status: string): any {
    const statusMessages: Record<string, string> = {
        "payment_required": "Your payment is required to process the order",
        "payment_captured": "Payment received! Your order is being processed",
        "requires_action": "Action required on your order",
        "partially_fulfilled": "Your order is being prepared",
        "partially_shipped": "Part of your order has been shipped",
        "shipped": "Your order has been shipped",
        "partially_returned": "Part of your order has been returned",
        "returned": "Your order has been returned",
        "canceled": "Your order has been canceled"
    }

    const message = statusMessages[status] || `Your order status has been updated to: ${status}`

    return {
        templateName: "order_status_update", // You may need to create this template
        bodyParameters: [
            { type: "text", text: orderId },
            { type: "text", text: message },
        ],
        headerType: "image"
    }
}

export const config: SubscriberConfig = {
    event: "order.updated",
    context: {
        subscriberId: "order-updated-handler",
    },
}
