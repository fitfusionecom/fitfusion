import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { cartAbandonmentProcessingWorkflow } from "../../../workflows/cart-abandonment-processing"

/**
 * GET /admin/cart-abandonment
 * 
 * Retrieve cart abandonment processing statistics
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const query = req.scope.resolve("query")

        // Fetch carts with optimized fields for statistics
        const { data: carts } = await query.graph({
            entity: "cart",
            fields: [
                "id",
                "completed_at",
                "customer_id",
                "items.id",
                "metadata"
            ],
        })

        // Calculate statistics efficiently
        const totalCarts = carts.length
        const completedCarts = carts.filter(cart => !!cart.completed_at).length
        const activeCarts = totalCarts - completedCarts

        // Count carts with items and customer (suitable for abandonment)
        const cartsWithItemsAndCustomer = carts.filter(cart =>
            !cart.completed_at &&
            cart.items &&
            cart.items.length > 0 &&
            cart.customer_id !== null &&
            cart.customer_id !== undefined
        ).length

        // Count abandoned carts (have notifications sent)
        const abandonedCarts = carts.filter(cart =>
            !cart.completed_at &&
            cart.items &&
            cart.items.length > 0 &&
            cart.customer_id !== null &&
            cart.customer_id !== undefined &&
            (cart.metadata as any)?.notifications?.secondSent === true
        ).length

        res.json({
            total_carts: totalCarts,
            active_carts: activeCarts,
            carts_with_items: cartsWithItemsAndCustomer,
            abandoned_carts: abandonedCarts,
            completed_carts: completedCarts
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve cart abandonment statistics",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}

/**
 * POST /admin/cart-abandonment/process
 * 
 * Manually trigger cart abandonment processing
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
        const body = req.body as {
            batchSize?: number;
            firstNotificationDelayHours?: number;
            secondNotificationDelayHours?: number;
            enableWhatsApp?: boolean;
            enableEmail?: boolean;
            cursor?: string;
        }

        const {
            batchSize,
            firstNotificationDelayHours,
            secondNotificationDelayHours,
            enableWhatsApp,
            enableEmail,
            cursor
        } = body

        // Execute the cart abandonment processing workflow
        const workflowResult = await cartAbandonmentProcessingWorkflow(req.scope)
            .run({
                input: {
                    batchSize,
                    firstNotificationDelayHours,
                    secondNotificationDelayHours,
                    enableWhatsApp,
                    enableEmail,
                    cursor
                }
            })

        const result = workflowResult.result as any

        res.json({
            success: true,
            result: {
                processed: result.processed,
                first_notifications_sent: result.firstNotificationsSent,
                second_notifications_sent: result.secondNotificationsSent,
                errors: result.errors,
                next_cursor: result.nextCursor
            }
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to process cart abandonment notifications",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}
