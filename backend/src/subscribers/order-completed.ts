import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import {
    WhatsAppService,
    OrderNotificationService,
    createWhatsAppService
} from "../utils/whatsapp-service"


/**
 * Order Completed Subscriber
 * 
 * Handles order.completed events and sends WhatsApp notifications
 */

export default async function orderCompletedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const logger = container.resolve("logger")
    const orderService: IOrderModuleService = container.resolve(Modules.ORDER)

    try {
        logger.info(`Order completed event received for order ${data.id}`)

        // Fetch the completed order details
        const order = await orderService.retrieveOrder(data.id, {
            relations: ["shipping_address", "billing_address", "fulfillments"]
        })

        logger.info(`Completed order details: ${order.id}, status: ${order.status}, total: ${order.total}`)

        // Send WhatsApp notification for order completion
        try {
            const mobileResult = WhatsAppService.extractMobileNumber(order)

            if (mobileResult.isValid && mobileResult.mobileNumber) {
                logger.info(`Sending WhatsApp completion notification to ${mobileResult.mobileNumber}`)

                const whatsappService = createWhatsAppService()
                const template = WhatsAppService.createOrderCompletedTemplate(order.id)

                const response = await whatsappService.sendTemplateMessage(
                    mobileResult.mobileNumber,
                    template
                )

                if (WhatsAppService.isSuccessResponse(response)) {
                    logger.info(`WhatsApp completion notification sent successfully for order ${order.id}`)

                    // Update notification status
                    const notificationService = new OrderNotificationService(orderService)
                    await notificationService.updateNotificationStatus(
                        order.id,
                        "wa_completed_notification",
                        { status: "success" }
                    )
                } else {
                    const errorMessage = WhatsAppService.getErrorMessage(response)
                    logger.error(`Failed to send WhatsApp completion notification: ${errorMessage}`)

                    // Update notification status
                    const notificationService = new OrderNotificationService(orderService)
                    await notificationService.updateNotificationStatus(
                        order.id,
                        "wa_completed_notification",
                        { status: "failed", error: errorMessage }
                    )
                }
            } else {
                logger.warn(`No valid mobile number found for order completion notification: ${order.id}`)
            }
        } catch (whatsappError) {
            logger.error(`Error sending WhatsApp completion notification for order ${order.id}:`, whatsappError)

            // Update notification status
            try {
                const notificationService = new OrderNotificationService(orderService)
                await notificationService.updateNotificationStatus(
                    order.id,
                    "wa_completed_notification",
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
        logger.error(`Error processing order completed event for order ${data.id}:`, error)
        // Don't throw error to prevent order processing failure
    }
}

export const config: SubscriberConfig = {
    event: "order.completed",
    context: {
        subscriberId: "order-completed-handler",
    },
}
