import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { APPOINTMENT_MODULE } from "../../../../modules/appointment"
import AppointmentModuleService from "../../../../modules/appointment/service"

export const CreateHolidaySchema = z.object({
    name: z.string().min(1),
    date: z.string().transform((str) => new Date(str)),
    is_recurring: z.boolean().optional().default(false),
    description: z.string().optional(),
})

export const DeleteHolidaySchema = z.object({
    id: z.string(),
})

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

    // Fetch holidays using MedusaService method
    const holidays = await appointmentModuleService.listHolidays()

    res.json({
        holidays: holidays || [],
    })
}

export const POST = async (
    req: MedusaRequest<z.infer<typeof CreateHolidaySchema>>,
    res: MedusaResponse
) => {
    const validatedBody = CreateHolidaySchema.parse(req.body)
    const { name, date, is_recurring, description } = validatedBody

    const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

    const result = await appointmentModuleService.createHoliday({
        name,
        date,
        is_recurring,
        description,
    })

    res.json({
        holiday: result,
        message: "Holiday created successfully",
    })
}

export const DELETE = async (
    req: MedusaRequest<z.infer<typeof DeleteHolidaySchema>>,
    res: MedusaResponse
) => {
    const validatedBody = DeleteHolidaySchema.parse(req.body)
    const { id } = validatedBody

    const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

    await appointmentModuleService.deleteHolidays({ id })

    res.json({
        success: true,
        message: "Holiday deleted successfully",
    })
}
