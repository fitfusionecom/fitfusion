import {
    createWorkflow,
    createStep,
    WorkflowResponse,
    StepResponse,
    StepExecutionContext,
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import {
    CartAbandonmentService,
    CartProcessingResult,
    CartAbandonmentConfig
} from "../utils/cart-abandonment-service"

/**
 * Cart Abandonment Processing Workflow Input
 */
export type CartAbandonmentProcessingInput = {
    batchSize?: number
    firstNotificationDelayHours?: number
    secondNotificationDelayHours?: number
    enableWhatsApp?: boolean
    enableEmail?: boolean
    cursor?: string // Optional cursor for resuming processing
}

/**
 * Cart Abandonment Processing Workflow Output
 */
export type CartAbandonmentProcessingOutput = {
    result: CartProcessingResult
    config: CartAbandonmentConfig
}

/**
 * Step to process cart abandonment notifications
 */
const processCartAbandonmentStep = createStep(
    "process-cart-abandonment",
    async (
        input: CartAbandonmentProcessingInput,
        { container }: StepExecutionContext
    ) => {
        const cartService = container.resolve(Modules.CART)
        const logger = container.resolve("logger")

        logger.info("Starting cart abandonment processing workflow")

        // Create cart abandonment service with provided configuration
        const config: CartAbandonmentConfig = {
            batchSize: input.batchSize || 100,
            firstNotificationDelayHours: input.firstNotificationDelayHours || 24,
            secondNotificationDelayHours: input.secondNotificationDelayHours || 48,
            enableWhatsApp: input.enableWhatsApp !== false, // Default to true
            enableEmail: input.enableEmail || false
        }

        const cartAbandonmentService = new CartAbandonmentService(cartService, config)

        let result: CartProcessingResult

        if (input.cursor) {
            // Process single batch from cursor
            logger.info(`Processing cart batch from cursor: ${input.cursor}`)
            result = await cartAbandonmentService.processCartsBatch(input.cursor)
        } else {
            // Process all carts
            logger.info("Processing all carts for abandonment notifications")
            result = await cartAbandonmentService.processAllCarts()
        }

        logger.info(`Cart abandonment processing completed - Processed: ${result.processed}, First notifications: ${result.firstNotificationsSent}, Second notifications: ${result.secondNotificationsSent}, Errors: ${result.errors}`)

        return new StepResponse({
            result,
            config
        })
    }
)

/**
 * Cart Abandonment Processing Workflow
 */
export const cartAbandonmentProcessingWorkflow = createWorkflow(
    "cart-abandonment-processing",
    (input: CartAbandonmentProcessingInput) => {
        const processingResult = processCartAbandonmentStep(input)

        return new WorkflowResponse({
            result: processingResult.result,
            config: processingResult.config
        })
    }
)
