import { MedusaContainer } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import {
    CartAbandonmentService,
    createCartAbandonmentService,
    CartProcessingResult
} from "../utils/cart-abandonment-service"

/**
 * Cart Abandonment Notification Job
 * 
 * This scheduled job processes abandoned carts and sends notifications
 * using cursor-based batch processing for efficiency.
 * 
 * Schedule: Runs every hour
 * Cron: "0 * * * *" (every hour at minute 0)
 */
export default async function cartAbandonmentNotificationsJob(container: MedusaContainer) {
    const logger = container.resolve("logger")
    const cartService = container.resolve(Modules.CART)

    logger.info("Starting cart abandonment notification job")

    try {
        // Create cart abandonment service with default configuration
        const cartAbandonmentService = createCartAbandonmentService(cartService, {
            batchSize: 100,
            firstNotificationDelayHours: 24,
            secondNotificationDelayHours: 48,
            enableWhatsApp: true,
            enableEmail: false
        })

        logger.info("Processing carts for abandonment notifications...")

        // Process all carts using cursor-based pagination
        const result: CartProcessingResult = await cartAbandonmentService.processAllCarts()

        // Log results
        logger.info(`Cart abandonment notification job completed - Processed: ${result.processed}, First notifications: ${result.firstNotificationsSent}, Second notifications: ${result.secondNotificationsSent}, Errors: ${result.errors}`)

        // Log detailed statistics
        if (result.processed > 0) {
            const successRate = ((result.firstNotificationsSent + result.secondNotificationsSent) / result.processed) * 100
            logger.info(`Cart abandonment processing statistics - Success rate: ${successRate.toFixed(2)}%, First notification rate: ${(result.firstNotificationsSent / result.processed * 100).toFixed(2)}%, Second notification rate: ${(result.secondNotificationsSent / result.processed * 100).toFixed(2)}%, Error rate: ${(result.errors / result.processed * 100).toFixed(2)}%`)
        }

    } catch (error) {
        logger.error("Error in cart abandonment notification job:", error)

        // Don't throw error to prevent job system failure
        // The error is logged for debugging purposes
    }
}

/**
 * Job Configuration - DISABLED
 * Uncomment to enable automatic cart abandonment processing
 */
export const config = {
    name: "cart-abandonment-notifications",
    schedule: "0 0 0 0 0", // Disabled - runs never (invalid cron)
    // schedule: "0 * * * *", // Uncomment this line to enable (every hour at minute 0)
    // Optional: Limit number of executions (remove for unlimited)
    // numberOfExecutions: 1000
}
