import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { createAppointmentWorkflow } from "../../../workflows/create-appointment"
import { getAvailableSlotsWorkflow } from "../../../workflows/get-available-slots"
import { APPOINTMENT_MODULE } from "../../../modules/appointment"
import AppointmentModuleService from "../../../modules/appointment/service"

export const GetAvailableSlotsSchema = z.object({
    date: z.string().transform((str) => new Date(str)),
})

export const CreateAppointmentSchema = z.object({
    patient_name: z.string().min(1),
    patient_age: z.number().min(1).max(120),
    patient_address: z.string().min(1),
    contact_number: z.string().min(10),
    problem: z.string().min(1),
    appointment_date: z.string().transform((str) => new Date(str)),
    appointment_time: z.string().regex(/^\d{2}:\d{2}$/),
    payment_id: z.string().optional(),
})

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    try {
        const validatedQuery = GetAvailableSlotsSchema.parse(req.query)
        const { date } = validatedQuery

        const { result } = await getAvailableSlotsWorkflow(req.scope).run({
            input: { date },
        })

        res.json({
            available_slots: result.slots,
        })
    } catch (error) {
        console.error("Get available slots error:", error)

        if (error instanceof Error && error.message.includes("validation")) {
            return res.status(400).json({
                code: "VALIDATION_ERROR",
                type: "invalid_request",
                message: "Invalid date format. Please provide a valid date.",
            })
        }

        res.status(500).json({
            code: "INTERNAL_ERROR",
            type: "internal_error",
            message: "An error occurred while fetching available slots. Please try again.",
        })
    }
}

export const POST = async (
    req: MedusaRequest<z.infer<typeof CreateAppointmentSchema>>,
    res: MedusaResponse
) => {
    try {
        const validatedBody = CreateAppointmentSchema.parse(req.body)
        const { patient_name, patient_age, patient_address, contact_number, problem, appointment_date, appointment_time, payment_id } = validatedBody

        // Call service directly instead of using workflow
        const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)
        const result = await appointmentModuleService.createAppointment({
            patient_name,
            patient_age,
            patient_address,
            contact_number,
            problem,
            appointment_date,
            appointment_time,
            payment_id,
        })

        if (!result.success) {
            if (result.error === "Selected time slot is not available") {
                return res.status(400).json({
                    code: "SLOT_NOT_AVAILABLE",
                    type: "invalid_request",
                    message: "The selected time slot is not available. Please choose a different time.",
                })
            }

            return res.status(400).json({
                code: "BOOKING_ERROR",
                type: "invalid_request",
                message: result.error || "Unable to book appointment",
            })
        }

        res.json({
            appointment: result.appointment,
            message: "Appointment booked successfully! You will receive a confirmation shortly.",
        })
    } catch (error) {
        console.error("Appointment booking error:", error)

        if (error instanceof Error && error.message.includes("validation")) {
            return res.status(400).json({
                code: "VALIDATION_ERROR",
                type: "invalid_request",
                message: error.message,
            })
        }

        // Generic error response
        res.status(500).json({
            code: "INTERNAL_ERROR",
            type: "internal_error",
            message: "An error occurred while booking the appointment. Please try again.",
        })
    }
}
