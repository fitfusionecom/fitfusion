import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { APPOINTMENT_MODULE } from "../../../../modules/appointment"
import AppointmentModuleService from "../../../../modules/appointment/service"

export const UpdateDoctorAvailabilitySchema = z.object({
    date: z.string().transform((str) => new Date(str)),
    is_available: z.boolean(),
    unavailable_reason: z.string().optional(),
})

export const SetDoctorUnavailableSchema = z.object({
    date: z.string().transform((str) => new Date(str)),
    unavailable_reason: z.string().min(1),
    unavailable_type: z.enum(['full_day', 'partial_day', 'specific_hours']),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    notes: z.string().optional(),
})

export const SetDoctorAvailableSchema = z.object({
    date: z.string().transform((str) => new Date(str)),
})

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

    // Fetch doctor availabilities using MedusaService method
    const availabilities = await appointmentModuleService.listDoctorAvailabilities()

    res.json({
        availabilities: availabilities || [],
    })
}

export const PATCH = async (
    req: MedusaRequest<z.infer<typeof UpdateDoctorAvailabilitySchema>>,
    res: MedusaResponse
) => {
    const validatedBody = UpdateDoctorAvailabilitySchema.parse(req.body)
    const { date, is_available, unavailable_reason } = validatedBody

    const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

    const result = await appointmentModuleService.updateDoctorAvailability(
        date,
        is_available,
        unavailable_reason
    )

    res.json({
        availability: result,
        message: `Doctor availability updated for ${date.toISOString().split('T')[0]}`,
    })
}

// Set doctor unavailable
export const PUT = async (
    req: MedusaRequest<z.infer<typeof SetDoctorUnavailableSchema>>,
    res: MedusaResponse
) => {
    const validatedBody = SetDoctorUnavailableSchema.parse(req.body)
    const { date, unavailable_reason, unavailable_type, start_time, end_time, notes } = validatedBody

    const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

    const result = await appointmentModuleService.setDoctorUnavailable({
        date,
        unavailable_reason,
        unavailable_type,
        start_time,
        end_time,
        notes,
    })

    res.json({
        availability: result,
        message: `Doctor marked as unavailable for ${date.toISOString().split('T')[0]}`,
    })
}

// Set doctor available (remove unavailability)
export const DELETE = async (
    req: MedusaRequest<z.infer<typeof SetDoctorAvailableSchema>>,
    res: MedusaResponse
) => {
    const validatedBody = SetDoctorAvailableSchema.parse(req.body)
    const { date } = validatedBody

    const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

    const result = await appointmentModuleService.setDoctorAvailable(date)

    res.json({
        availability: result,
        message: `Doctor marked as available for ${date.toISOString().split('T')[0]}`,
    })
}
