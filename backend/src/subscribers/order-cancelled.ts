import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import {
    WhatsAppService,
    OrderNotificationService,
    createWhatsAppService
} from "../utils/whatsapp-service"


/**
 * Order Cancelled Subscriber
 * 
 * Handles order.cancelled events and sends WhatsApp notifications
 */

export default async function orderCancelledHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const logger = container.resolve("logger")
    const orderService: IOrderModuleService = container.resolve(Modules.ORDER)

    try {
        logger.info(`Order cancelled event received for order ${data.id}`)

        // Fetch the cancelled order details
        const order = await orderService.retrieveOrder(data.id, {
            relations: ["shipping_address", "billing_address"]
        })

        logger.info(`Cancelled order details: ${order.id}, status: ${order.status}`)

        // Log cancellation reason if available in metadata
        if (order.metadata && order.metadata.cancellation_reason) {
            logger.info(`Cancellation reason: ${order.metadata.cancellation_reason}`)
        }

        // Send WhatsApp notification for order cancellation
        try {
            const mobileResult = WhatsAppService.extractMobileNumber(order)

            if (mobileResult.isValid && mobileResult.mobileNumber) {
                logger.info(`Sending WhatsApp cancellation notification to ${mobileResult.mobileNumber}`)

                const whatsappService = createWhatsAppService()
                const template = WhatsAppService.createOrderCancelledTemplate(
                    order.id,
                    order.metadata?.cancellation_reason as string
                )

                const response = await whatsappService.sendTemplateMessage(
                    mobileResult.mobileNumber,
                    template
                )

                if (WhatsAppService.isSuccessResponse(response)) {
                    logger.info(`WhatsApp cancellation notification sent successfully for order ${order.id}`)

                    // Update notification status
                    const notificationService = new OrderNotificationService(orderService)
                    await notificationService.updateNotificationStatus(
                        order.id,
                        "wa_cancelled_notification",
                        { status: "success" }
                    )
                } else {
                    const errorMessage = WhatsAppService.getErrorMessage(response)
                    logger.error(`Failed to send WhatsApp cancellation notification: ${errorMessage}`)

                    // Update notification status
                    const notificationService = new OrderNotificationService(orderService)
                    await notificationService.updateNotificationStatus(
                        order.id,
                        "wa_cancelled_notification",
                        { status: "failed", error: errorMessage }
                    )
                }
            } else {
                logger.warn(`No valid mobile number found for order cancellation notification: ${order.id}`)
            }
        } catch (whatsappError) {
            logger.error(`Error sending WhatsApp cancellation notification for order ${order.id}:`, whatsappError)

            // Update notification status
            try {
                const notificationService = new OrderNotificationService(orderService)
                await notificationService.updateNotificationStatus(
                    order.id,
                    "wa_cancelled_notification",
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
        logger.error(`Error processing order cancelled event for order ${data.id}:`, error)
        // Don't throw error to prevent order processing failure
    }
}

export const config: SubscriberConfig = {
    event: "order.canceled",
    context: {
        subscriberId: "order-cancelled-handler",
    },
}
