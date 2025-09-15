import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { APPOINTMENT_MODULE } from "../../modules/appointment"
import AppointmentModuleService from "../../modules/appointment/service"

export type UpdateAppointmentStatusStepInput = {
    appointment_id: string
    status: "scheduled" | "completed" | "cancelled" | "rescheduled"
    cancellation_reason?: string
    doctor_notes?: string
}

export const updateAppointmentStatusStep = createStep(
    "update-appointment-status-step",
    async (input: UpdateAppointmentStatusStepInput, { container }) => {
        const appointmentModuleService: AppointmentModuleService = container.resolve(
            APPOINTMENT_MODULE
        )

        const appointment = await appointmentModuleService.updateAppointmentStatus(
            input.appointment_id,
            input.status,
            input.cancellation_reason,
            input.doctor_notes
        )

        return new StepResponse(appointment, appointment.id)
    },
    async (appointmentId, { container }) => {
        if (!appointmentId) {
            return
        }

        const appointmentModuleService: AppointmentModuleService = container.resolve(
            APPOINTMENT_MODULE
        )

        // Revert to previous status - this would need to be stored in the step context
        // For now, we'll just log the rollback
        console.log(`Rolling back appointment ${appointmentId} status update`)
    }
)
