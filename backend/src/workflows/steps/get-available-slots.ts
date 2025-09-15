import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { APPOINTMENT_MODULE } from "../../modules/appointment"
import AppointmentModuleService from "../../modules/appointment/service"

export type GetAvailableSlotsStepInput = {
    date: Date
}

export const getAvailableSlotsStep = createStep(
    "get-available-slots-step",
    async (input: GetAvailableSlotsStepInput, { container }) => {
        const appointmentModuleService: AppointmentModuleService = container.resolve(
            APPOINTMENT_MODULE
        )

        const slots = await appointmentModuleService.getAvailableSlots(input.date)

        return new StepResponse(slots, slots)
    }
)
