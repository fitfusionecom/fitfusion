import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { cartAbandonmentProcessingWorkflow } from "../../../../workflows/cart-abandonment-processing"

/**
 * POST /admin/cart-abandonment/process
 * 
 * Manually trigger cart abandonment processing
 * 
 * Body parameters:
 * - batchSize?: number (default: 100)
 * - firstNotificationDelayHours?: number (default: 24)
 * - secondNotificationDelayHours?: number (default: 48)
 * - enableWhatsApp?: boolean (default: true)
 * - enableEmail?: boolean (default: false)
 * - cursor?: string (optional cursor for batch processing)
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
        const body = req.body as {
            batchSize?: number
            firstNotificationDelayHours?: number
            secondNotificationDelayHours?: number
            enableWhatsApp?: boolean
            enableEmail?: boolean
            cursor?: string
        }

        const {
            batchSize,
            firstNotificationDelayHours,
            secondNotificationDelayHours,
            enableWhatsApp,
            enableEmail,
            cursor
        } = body

        // Validate input parameters
        const config = {
            batchSize: batchSize && batchSize > 0 ? batchSize : 100,
            firstNotificationDelayHours: firstNotificationDelayHours && firstNotificationDelayHours > 0 ? firstNotificationDelayHours : 24,
            secondNotificationDelayHours: secondNotificationDelayHours && secondNotificationDelayHours > 0 ? secondNotificationDelayHours : 48,
            enableWhatsApp: enableWhatsApp !== false, // Default to true
            enableEmail: enableEmail === true, // Default to false
            cursor: cursor || undefined
        }

        // Execute the cart abandonment processing workflow
        const workflowResult = await cartAbandonmentProcessingWorkflow(req.scope)
            .run({
                input: config
            })

        const result = workflowResult.result as any

        res.json({
            success: true,
            message: "Cart abandonment processing completed",
            result: {
                processed: result.processed,
                first_notifications_sent: result.firstNotificationsSent,
                second_notifications_sent: result.secondNotificationsSent,
                errors: result.errors,
                next_cursor: result.nextCursor
            },
            config: {
                batch_size: config.batchSize,
                first_notification_delay_hours: config.firstNotificationDelayHours,
                second_notification_delay_hours: config.secondNotificationDelayHours,
                whatsapp_enabled: config.enableWhatsApp,
                email_enabled: config.enableEmail
            }
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to process cart abandonment notifications",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}
