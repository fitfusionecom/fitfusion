// src/api/info/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
    filterInfoWorkflow,
    createInfoWorkflow,
    deleteInfoWorkflow
} from "../../workflows/info"

// GET endpoint to retrieve info by product ID
export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const productId = req.query.product_id as string ?? null

    // if (!productId) {
    //     return res.status(400).json({
    //         message: "product_id is required"
    //     })
    // }
    const { result } = await filterInfoWorkflow(req.scope)
        .run({
            input: {
                product_id: productId
            }
        })

    res.json({
        info: result.info
    })
}

// POST endpoint to create a new info
export async function POST(
    req: MedusaRequest<{
        product_id: string,
        desc1: string,
        desc2: string,
        desc3: string,
        banner: string
    }>,
    res: MedusaResponse
) {
    const { product_id, desc1, desc2, desc3, banner } = req.body

    if (!product_id || !desc1 || !desc2 || !desc3 || !banner) {
        return res.status(400).json({
            message: "product_id, desc1, desc2, desc3, and banner are required"
        })
    }

    const { result } = await createInfoWorkflow(req.scope)
        .run({
            input: {
                product_id,
                desc1,
                desc2,
                desc3,
                banner
            }
        })

    res.status(201).json({
        info: result.info
    })
}


export async function DELETE(
    req: MedusaRequest<{
        id: string,
    }>,
    res: MedusaResponse
) {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({
            message: "id is required"
        })
    }

    const { result } = await deleteInfoWorkflow(req.scope)
        .run({
            input: {
                id
            }
        })

    res.status(201).json({
        info: result
    })
}



