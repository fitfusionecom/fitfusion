import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import {
    WhatsAppService,
    OrderNotificationService,
    createWhatsAppService
} from "../utils/whatsapp-service"


/**
 * WhatsApp Order Placed Notification Subscriber
 * 
 * Tracks notification status in order metadata:
 * - wa_placed_notification: "success" | "failed"
 * - wa_placed_notification_error: error message (when failed)
 */

export default async function orderPlacedWhatsAppHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const logger = container.resolve("logger")
    const orderService: IOrderModuleService = container.resolve(Modules.ORDER)

    try {
        logger.info(`Order placed event received for order ${data.id}`)

        // Fetch the complete order details including customer information
        const order = await orderService.retrieveOrder(data.id, {
            relations: ["shipping_address", "billing_address"]
        })

        logger.info(`Order retrieved: ${order.id}`)

        // Extract mobile number using the utility function
        const mobileResult = WhatsAppService.extractMobileNumber(order)

        if (!mobileResult.isValid || !mobileResult.mobileNumber) {
            logger.warn(`No valid mobile number found for order ${order.id}. Source: ${mobileResult.source}`)

            // Update order metadata to track notification failure
            const notificationService = new OrderNotificationService(orderService)
            await notificationService.updateNotificationStatus(
                order.id,
                "wa_placed_notification",
                {
                    status: "failed",
                    error: "No valid mobile number found"
                }
            )

            logger.info(`Updated order ${order.id} metadata: WhatsApp notification failed - no mobile number`)
            return
        }

        logger.info(`Mobile number found: ${mobileResult.mobileNumber} (source: ${mobileResult.source})`)

        // Create WhatsApp service and send message
        const whatsappService = createWhatsAppService()
        const template = WhatsAppService.createOrderPlacedTemplate(order.id)

        logger.info(`Sending WhatsApp message to ${mobileResult.mobileNumber} for order ${order.id}`)

        const response = await whatsappService.sendTemplateMessage(
            mobileResult.mobileNumber,
            template
        )

        logger.info(`WhatsApp API response for order ${order.id}: ${JSON.stringify(response)}`)

        // Check if WhatsApp message was sent successfully
        if (!WhatsAppService.isSuccessResponse(response)) {
            const errorMessage = WhatsAppService.getErrorMessage(response)
            logger.error(`Error sending WhatsApp message for order ${order.id}: ${errorMessage}`)

            // Update order metadata to track failed notification
            const notificationService = new OrderNotificationService(orderService)
            await notificationService.updateNotificationStatus(
                order.id,
                "wa_placed_notification",
                {
                    status: "failed",
                    error: errorMessage
                }
            )

            logger.info(`Updated order ${order.id} metadata: WhatsApp notification failed`)
            return
        }

        // Update order metadata to track successful notification
        const notificationService = new OrderNotificationService(orderService)
        await notificationService.updateNotificationStatus(
            order.id,
            "wa_placed_notification",
            {
                status: "success"
            }
        )

        logger.info(`Updated order ${order.id} metadata: WhatsApp notification sent successfully`)

    } catch (error) {
        logger.error(`Error processing order placed event for order ${data.id}:`, error)

        // Update order metadata to track notification failure due to system error
        try {
            const notificationService = new OrderNotificationService(orderService)
            await notificationService.updateNotificationStatus(
                data.id,
                "wa_placed_notification",
                {
                    status: "failed",
                    error: error instanceof Error ? error.message : String(error)
                }
            )

            logger.info(`Updated order ${data.id} metadata: WhatsApp notification failed - system error`)
        } catch (metadataError) {
            logger.error(`Failed to update order metadata for ${data.id}:`, metadataError)
        }

        // Don't throw error to prevent order processing failure
    }
}

export const config: SubscriberConfig = {
    event: "order.placed",
    context: {
        subscriberId: "order-placed-whatsapp-handler",
    },
}
