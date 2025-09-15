import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { getAvailableSlotsStep } from "./steps/get-available-slots"

export type GetAvailableSlotsInput = {
    date: Date
}

export const getAvailableSlotsWorkflow = createWorkflow(
    "get-available-slots",
    (input: GetAvailableSlotsInput) => {
        const slots = getAvailableSlotsStep(input)
        return new WorkflowResponse({
            slots,
        })
    }
)
