import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { APPOINTMENT_MODULE } from "../../modules/appointment"
import AppointmentModuleService from "../../modules/appointment/service"

export type CreateAppointmentStepInput = {
    patient_name: string
    patient_age: number
    patient_address: string
    contact_number: string
    problem: string
    appointment_date: Date
    appointment_time: string
    payment_id?: string
}

export const createAppointmentStep = createStep(
    "create-appointment-step",
    async (input: CreateAppointmentStepInput, { container }) => {
        const appointmentModuleService: AppointmentModuleService = container.resolve(
            APPOINTMENT_MODULE
        )

        const result = await appointmentModuleService.createAppointment(input)

        if (!result.success) {
            throw new Error(result.error)
        }

        return new StepResponse(result.appointment, result.appointment.id)
    },
    async (appointmentId, { container }) => {
        if (!appointmentId) {
            return
        }

        const appointmentModuleService: AppointmentModuleService = container.resolve(
            APPOINTMENT_MODULE
        )

        await appointmentModuleService.deleteAppointments(appointmentId)
    }
)
