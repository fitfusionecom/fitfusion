import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import {
    WhatsAppService,
    OrderNotificationService,
    createWhatsAppService
} from "../utils/whatsapp-service"


/**
 * Order Shipment Created Subscriber
 * 
 * Handles order.shipment_created events and sends WhatsApp notifications
 */

export default async function orderShipmentCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const logger = container.resolve("logger")
    const orderService: IOrderModuleService = container.resolve(Modules.ORDER)

    try {
        logger.info(`Order shipment created event received for order ${data.id}`)

        // Fetch the order details
        const order = await orderService.retrieveOrder(data.id, {
            relations: ["shipping_address", "billing_address", "fulfillments"]
        })

        logger.info(`Order details: ${order.id}, status: ${order.status}`)

        // Extract tracking number from fulfillments if available
        let trackingNumber: string | undefined
        if ((order as any).fulfillments && (order as any).fulfillments.length > 0) {
            const fulfillment = (order as any).fulfillments[0]
            trackingNumber = fulfillment.tracking_numbers?.[0] || fulfillment.tracking_number
        }

        // Send WhatsApp notification for shipment creation
        try {
            const mobileResult = WhatsAppService.extractMobileNumber(order)

            if (mobileResult.isValid && mobileResult.mobileNumber) {
                logger.info(`Sending WhatsApp shipment notification to ${mobileResult.mobileNumber}`)

                const whatsappService = createWhatsAppService()
                const template = WhatsAppService.createShipmentCreatedTemplate(order.id, trackingNumber)

                const response = await whatsappService.sendTemplateMessage(
                    mobileResult.mobileNumber,
                    template
                )

                if (WhatsAppService.isSuccessResponse(response)) {
                    logger.info(`WhatsApp shipment notification sent successfully for order ${order.id}`)

                    // Update notification status
                    const notificationService = new OrderNotificationService(orderService)
                    await notificationService.updateNotificationStatus(
                        order.id,
                        "wa_shipment_notification",
                        { status: "success" }
                    )
                } else {
                    const errorMessage = WhatsAppService.getErrorMessage(response)
                    logger.error(`Failed to send WhatsApp shipment notification: ${errorMessage}`)

                    // Update notification status
                    const notificationService = new OrderNotificationService(orderService)
                    await notificationService.updateNotificationStatus(
                        order.id,
                        "wa_shipment_notification",
                        { status: "failed", error: errorMessage }
                    )
                }
            } else {
                logger.warn(`No valid mobile number found for shipment notification: ${order.id}`)
            }
        } catch (whatsappError) {
            logger.error(`Error sending WhatsApp shipment notification for order ${order.id}:`, whatsappError)

            // Update notification status
            try {
                const notificationService = new OrderNotificationService(orderService)
                await notificationService.updateNotificationStatus(
                    order.id,
                    "wa_shipment_notification",
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
        logger.error(`Error processing order shipment created event for order ${data.id}:`, error)
        // Don't throw error to prevent order processing failure
    }
}

export const config: SubscriberConfig = {
    event: "order.shipment_created",
    context: {
        subscriberId: "order-shipment-created-handler",
    },
}
