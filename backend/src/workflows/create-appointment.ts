import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { createAppointmentStep } from "./steps/create-appointment"

export type CreateAppointmentInput = {
    patient_name: string
    patient_age: number
    patient_address: string
    contact_number: string
    problem: string
    appointment_date: Date
    appointment_time: string
    payment_id?: string
}

export const createAppointmentWorkflow = createWorkflow(
    "create-appointment",
    (input: CreateAppointmentInput) => {
        const appointment = createAppointmentStep(input)
        return new WorkflowResponse({
            appointment,
        })
    }
)
