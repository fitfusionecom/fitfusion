import axios from "axios"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"

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
        logger.info(`Order data: ${JSON.stringify(data)}`)

        // Fetch the complete order details including customer information
        const order = await orderService.retrieveOrder(data.id, {
            relations: ["shipping_address", "billing_address"]
        })

        logger.info(`Order: ${JSON.stringify(order)}`)

        // Extract user email from order
        const userEmail = order?.email
        logger.info(`User email: ${userEmail}`)

        // Extract mobile number from email format (e.g., 7354657459@fitfusion.com)
        let mobileNumber: string | null = null
        if (userEmail && userEmail.includes('@fitfusion.com')) {
            const extractedNumber = userEmail.split('@')[0]
            // Validate that it's a valid mobile number (10 digits)
            if (/^\d{10}$/.test(extractedNumber)) {
                mobileNumber = extractedNumber
                logger.info(`Mobile number extracted from email: ${mobileNumber}`)
            } else {
                logger.warn(`Invalid mobile number format in email: ${extractedNumber}`)
            }
        }

        // Fallback to shipping address mobile number if not found in email
        if (!mobileNumber) {
            const shippingAddress = (order as any).shipping_address
            if (shippingAddress && shippingAddress.phone) {
                // Clean the phone number (remove any non-digit characters)
                const cleanPhone = shippingAddress.phone.replace(/\D/g, '')
                if (/^\d{10}$/.test(cleanPhone)) {
                    mobileNumber = cleanPhone
                    logger.info(`Using mobile number from shipping address: ${mobileNumber}`)
                } else {
                    logger.warn(`Invalid mobile number format in shipping address: ${shippingAddress.phone}`)
                }
            }
        }

        if (!mobileNumber) {
            logger.warn(`No mobile number found for order ${order.id}. Cannot send WhatsApp message.`)

            // Update order metadata to track notification failure due to missing mobile number
            await orderService.updateOrders(order.id, {
                metadata: {
                    ...order.metadata,
                    wa_placed_notification: "failed",
                    wa_placed_notification_error: "No valid mobile number found"
                }
            })

            logger.info(`Updated order ${order.id} metadata: WhatsApp notification failed - no mobile number`)
            return
        }

        // Prepare WhatsApp message body parameters
        const bodyParameters = [
            { type: "text", text: order.id },
            { type: "text", text: `/${order.id}` },
        ]

        const body = {
            key: "5b3acc6fcb52468091f9792a1543d444",
            to: mobileNumber, // Using mobile number as the recipient identifier
            languageCode: "en",
            TemplateName: "appointment",
            headertype: "image",
            link: "https://www.xyz.com//Files/b4063f333fdec6.jpeg",
            filename: "",
            headertext: "",
            BodyParameter: bodyParameters,
        }

        logger.info(`Sending WhatsApp message to ${mobileNumber} for order ${order.id}`)
        logger.info(`Body parameters: ${JSON.stringify(bodyParameters)}`)

        const response = await axios.post(
            "https://waba2waba.com/api/v1/sendTemplateMessage",
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        logger.info(`WhatsApp message sent successfully for order ${order.id}: ${JSON.stringify(response.data)}`)

        // Check if WhatsApp message was sent successfully
        if (response.data.ErrorCode !== "000") {
            logger.error(`Error sending WhatsApp message for order ${order.id}: ${JSON.stringify(response.data)}`)

            // Update order metadata to track failed notification
            await orderService.updateOrders(order.id, {
                metadata: {
                    ...order.metadata,
                    wa_placed_notification: "failed",
                    wa_placed_notification_error: response.data.ErrorMessage || "Unknown error"
                }
            })

            logger.info(`Updated order ${order.id} metadata: WhatsApp notification failed`)
            return
        }

        // Update order metadata to track successful notification
        await orderService.updateOrders(order.id, {
            metadata: {
                ...order.metadata,
                wa_placed_notification: "success"
            }
        })

        logger.info(`Updated order ${order.id} metadata: WhatsApp notification sent successfully`)

        // Add your custom logic here when order is placed
        // For example: send notifications, update external systems, etc.

    } catch (error) {
        logger.error(`Error processing order placed event for order ${data.id}:`, error)
        // Update order metadata to track notification failure due to system error
        try {
            await orderService.updateOrders(data.id, {
                metadata: {
                    wa_placed_notification: "failed",
                    wa_placed_notification_error: error instanceof Error ? error?.message : String(error)
                }
            })

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
