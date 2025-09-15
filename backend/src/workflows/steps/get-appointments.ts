import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { APPOINTMENT_MODULE } from "../../modules/appointment"
import AppointmentModuleService from "../../modules/appointment/service"

export type GetAppointmentsStepInput = {
    limit?: number
    offset?: number
    status?: "scheduled" | "completed" | "cancelled" | "rescheduled"
    start_date?: string
    end_date?: string
    patient_name?: string
}

export const getAppointmentsStep = createStep(
    "get-appointments-step",
    async (
        {
            limit = 20,
            offset = 0,
            status,
            start_date,
            end_date,
            patient_name,
        }: GetAppointmentsStepInput,
        { container }
    ) => {
        const appointmentModuleService: AppointmentModuleService = container.resolve(
            APPOINTMENT_MODULE
        )

        let filters: any = {}
        if (status) filters.status = status
        if (patient_name) filters.patient_name = patient_name

        let appointments
        if (start_date && end_date) {
            appointments = await appointmentModuleService.getAppointmentsByDateRange(
                new Date(start_date),
                new Date(end_date),
                status
            )
        } else {
            appointments = await appointmentModuleService.listAppointmentsWithFilters(filters)
        }

        // Apply pagination
        const startIndex = offset ? Number(offset) : 0
        const endIndex = limit ? startIndex + Number(limit) : appointments.length
        const paginatedAppointments = appointments.slice(startIndex, endIndex)

        return new StepResponse({
            appointments: paginatedAppointments,
            count: appointments.length,
            offset: startIndex,
            limit: limit ? Number(limit) : appointments.length,
        })
    }
)
