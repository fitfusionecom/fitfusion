import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { updateAppointmentStatusStep } from "./steps/update-appointment-status"

export type UpdateAppointmentStatusInput = {
    appointment_id: string
    status: "scheduled" | "completed" | "cancelled" | "rescheduled"
    cancellation_reason?: string
    doctor_notes?: string
}

export const updateAppointmentStatusWorkflow = createWorkflow(
    "update-appointment-status",
    (input: UpdateAppointmentStatusInput) => {
        const appointment = updateAppointmentStatusStep(input)
        return new WorkflowResponse({
            appointment,
        })
    }
)
