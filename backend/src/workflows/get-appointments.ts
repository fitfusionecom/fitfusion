import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { getAppointmentsStep } from "./steps/get-appointments"

export type GetAppointmentsInput = {
    limit?: number
    offset?: number
    status?: "scheduled" | "completed" | "cancelled" | "rescheduled"
    start_date?: string
    end_date?: string
    patient_name?: string
}

export const getAppointmentsWorkflow = createWorkflow(
    "get-appointments",
    (input: GetAppointmentsInput) => {
        const result = getAppointmentsStep(input)
        return new WorkflowResponse(result)
    }
)
