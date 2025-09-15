import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { DeleteAppointmentInput } from "../delete-appointment"
import { APPOINTMENT_MODULE } from "../../modules/appointment"
import AppointmentModuleService from "../../modules/appointment/service"

export const deleteAppointmentStep = createStep(
    "delete-appointment",
    async (
        { id }: DeleteAppointmentInput,
        { container }
    ) => {
        const query = container.resolve("query")

        // First check if appointment exists
        const existingAppointment = await query.graph({
            entity: "appointment",
            fields: ["id", "status"],
            filters: {
                id,
            },
        })

        if (!existingAppointment.data || existingAppointment.data.length === 0) {
            throw new Error("Appointment not found")
        }

        // Delete the appointment using the appointment module service
        const appointmentModuleService: AppointmentModuleService = container.resolve(APPOINTMENT_MODULE)
        await appointmentModuleService.deleteAppointments({ id })

        return new StepResponse(true)
    }
)
