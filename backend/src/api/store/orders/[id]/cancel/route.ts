import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { cancelOrderWorkflow } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"

export const CancelOrderSchema = z.object({
    cancellation_reason: z.string().min(1, "Cancellation reason is required"),
    cancelled_by: z.string().optional(),
    no_notification: z.boolean().optional().default(false),
})

// Public API - No authentication required for order cancellation
export const POST = async (
    req: MedusaRequest<z.infer<typeof CancelOrderSchema>>,
    res: MedusaResponse
) => {
    const { id } = req.params
    const validatedBody = CancelOrderSchema.parse(req.body)
    const { cancellation_reason, cancelled_by, no_notification } = validatedBody

    try {
        // Get the order service
        const orderService: IOrderModuleService = req.scope.resolve(Modules.ORDER)

        // First, retrieve the order to check if it exists and can be cancelled
        const order = await orderService.retrieveOrder(id, {
            relations: ["items"]
        })

        // Check if order can be cancelled
        if (order.status === "canceled") {
            return res.status(400).json({
                error: "Order already cancelled",
                message: "This order has already been cancelled"
            })
        }

        if (order.status === "completed") {
            return res.status(400).json({
                error: "Cannot cancel completed order",
                message: "Completed orders cannot be cancelled"
            })
        }

        // Note: Fulfillment check removed as it's not available in OrderDTO
        // The cancelOrderWorkflow will handle fulfillment validation internally

        // Run the cancel order workflow
        const { result } = await cancelOrderWorkflow(req.scope).run({
            input: {
                order_id: id,
                no_notification,
                canceled_by: cancelled_by
            }
        })

        // Update order metadata with cancellation reason and details
        await orderService.updateOrders(id, {
            metadata: {
                ...order.metadata,
                cancellation_reason,
                cancelled_at: new Date().toISOString(),
                cancelled_by: cancelled_by || "customer",
                cancellation_status: "cancelled"
            }
        })

        res.json({
            success: true,
            message: "Order cancelled successfully",
            order: {
                id: id,
                status: "canceled",
                cancellation_reason,
                cancelled_at: new Date().toISOString(),
                cancelled_by: cancelled_by || "customer"
            }
        })

    } catch (error) {
        console.error('Error cancelling order:', error)

        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Validation error",
                message: error.errors[0].message,
                details: error.errors
            })
        }

        res.status(500).json({
            error: "Failed to cancel order",
            message: error instanceof Error ? error.message : "An unexpected error occurred"
        })
    }
}
