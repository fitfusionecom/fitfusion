import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

/**
 * GET /admin/carts
 * 
 * Retrieve carts with filtering and pagination for admin interface
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
        const query = req.scope.resolve("query")

        // Parse query parameters
        const {
            status,
            start_date,
            end_date,
            email,
            limit = 50,
            offset = 0
        } = req.query

        // Build optimized query based on status filter
        const fields = [
            "id",
            "created_at",
            "updated_at",
            "completed_at",
            "customer_id",
            "email",
            "metadata",
            "items.id",
            "items.product_id",
            "items.quantity",
            "items.title",
            "customer.id",
            "customer.email",
            "customer.first_name",
            "customer.last_name"
        ]

        // Add conditional fields based on status
        if (status === "completed") {
            fields.push("shipping_address", "billing_address")
        }

        // Fetch carts with optimized fields
        const { data: carts } = await query.graph({
            entity: "cart",
            fields,
        })

        // Optimized filtering based on status
        let filteredCarts: any[] = []

        if (status === "completed") {
            // Show completed carts only if specifically requested
            filteredCarts = carts.filter(cart =>
                !!cart.completed_at &&
                cart.customer_id !== null &&
                cart.customer_id !== undefined
            )
        } else if (status === "empty") {
            // Show empty carts only if specifically requested
            filteredCarts = carts.filter(cart =>
                !cart.completed_at &&
                (!cart.items || cart.items.length === 0) &&
                cart.customer_id !== null &&
                cart.customer_id !== undefined
            )
        } else if (status === "no_customer") {
            // Show carts without customer only if specifically requested
            filteredCarts = carts.filter(cart =>
                !cart.completed_at &&
                cart.items &&
                cart.items.length > 0 &&
                (cart.customer_id === null || cart.customer_id === undefined)
            )
        } else {
            // Default: active carts with items and customer (includes "active" and "abandoned")
            filteredCarts = carts.filter(cart =>
                !cart.completed_at &&
                cart.items &&
                cart.items.length > 0 &&
                cart.customer_id !== null &&
                cart.customer_id !== undefined
            )

            // Additional filter for abandoned carts
            if (status === "abandoned") {
                filteredCarts = filteredCarts.filter(cart =>
                    (cart.metadata as any)?.notifications?.secondSent === true
                )
            }
        }

        // Apply additional filters
        if (start_date || end_date || email) {
            const startDate = start_date ? new Date(start_date as string) : null
            const endDate = end_date ? new Date(end_date as string) : null
            const emailFilter = email ? (email as string).toLowerCase() : null

            filteredCarts = filteredCarts.filter(cart => {
                // Date filtering
                if (startDate && cart.created_at && new Date(cart.created_at) < startDate) {
                    return false
                }
                if (endDate && cart.created_at && new Date(cart.created_at) > endDate) {
                    return false
                }

                // Email filtering
                if (emailFilter) {
                    const cartEmail = cart.email?.toLowerCase()
                    const customerEmail = (cart as any).customer?.email?.toLowerCase()
                    if (!cartEmail?.includes(emailFilter) && !customerEmail?.includes(emailFilter)) {
                        return false
                    }
                }

                return true
            })
        }

        // Sort by creation date (latest first) - optimized
        filteredCarts.sort((a, b) => {
            return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        })

        // Apply pagination
        const limitNum = parseInt(limit as string)
        const offsetNum = parseInt(offset as string)
        const paginatedCarts = filteredCarts.slice(offsetNum, offsetNum + limitNum)

        // Optimize response data
        const optimizedCarts = paginatedCarts.map(cart => ({
            id: cart.id,
            created_at: cart.created_at,
            updated_at: cart.updated_at,
            completed_at: cart.completed_at,
            customer_id: cart.customer_id,
            email: cart.email,
            metadata: cart.metadata,
            items: cart.items?.map((item: any) => ({
                id: item.id,
                product_id: item.product_id,
                quantity: item.quantity,
                title: item.title
            })) || [],
            customer: cart.customer ? {
                id: cart.customer.id,
                email: cart.customer.email,
                first_name: cart.customer.first_name,
                last_name: cart.customer.last_name
            } : null
        }))

        res.json({
            carts: optimizedCarts,
            count: filteredCarts.length,
            limit: limitNum,
            offset: offsetNum,
            total_pages: Math.ceil(filteredCarts.length / limitNum)
        })
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve carts",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}
