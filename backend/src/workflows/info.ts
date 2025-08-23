// src/workflows/product-video-workflows.ts
import {
    createWorkflow,
    createStep,
    StepResponse,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"

// Define input types for the workflows
export type FilterInfoInput = {
    product_id?: string
}

export type CreateInfoInput = {
    product_id: string
    desc1: string
    desc2: string
    desc3: string
    banner: string
}

import { INFO_MODULE } from "../modules/info"

// Create a step to filter product stories
const filterInfoStep = createStep(
    "filter-info",
    async (input: FilterInfoInput, { container }) => {
        // Resolve your product-video module service
        const productVideoService: any = container.resolve(INFO_MODULE)

        // Query the product videos by product_id
        const info = await productVideoService.listInfo(input.product_id ? {
            product_id: input.product_id
        } : {})

        return new StepResponse({ info })
    }
)

const deleteInfoStep = createStep(
    "delete-info",
    async (input: { id: string }, { container }) => {
        // Resolve your product-video module service
        const productVideoService: any = container.resolve(INFO_MODULE)

        // Query the product videos by product_id
        const info = await productVideoService.deleteInfo({
            id: input.id
        })

        return new StepResponse({ info })
    }
)

// Create a step to create a product story
const createInfoStep = createStep(
    "create-info",
    async (input: CreateInfoInput, { container }) => {
        // Resolve your product-video module service
        const infoService: any = container.resolve(INFO_MODULE)

        const info_list = await infoService.listInfo({
            product_id: input.product_id
        })

        if (info_list.length > 0) {
            const info = await infoService.updateInfo({
                id: info_list[0].id,
                product_id: input.product_id,
                desc1: input.desc1,
                desc2: input.desc2,
                desc3: input.desc3,
                banner: input.banner
            })
            return new StepResponse({ info })
        }
        // Create the product video
        const info = await infoService.createInfo({
            product_id: input.product_id,
            desc1: input.desc1,
            desc2: input.desc2,
            desc3: input.desc3,
            banner: input.banner
        })
        return new StepResponse({ info }, info.id)
    },
    // Compensation function to handle rollbacks
    async (infoId, { container }) => {
        if (!infoId) {
            return
        }

        const productVideoService: any = container.resolve(INFO_MODULE)
        await productVideoService.deleteInfo(infoId)
    }
)




// Create the filter workflow
export const filterInfoWorkflow = createWorkflow(
    "filter-info",
    function (input: FilterInfoInput) {
        const { info } = filterInfoStep(input)

        return new WorkflowResponse({
            info
        })
    }
)

// Create the create workflow
export const createInfoWorkflow = createWorkflow(
    "create-info",
    function (input: CreateInfoInput) {
        const { info } = createInfoStep(input)

        return new WorkflowResponse({
            info
        })
    }
)

// Create the delete workflow

export const deleteInfoWorkflow = createWorkflow(
    "delete-info",
    function (input: { id: string }) {
        const { info } = deleteInfoStep(input)

        return new WorkflowResponse({
            info
        })
    }
)