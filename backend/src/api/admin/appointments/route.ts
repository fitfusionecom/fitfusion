import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { z } from "zod"
import { updateAppointmentStatusWorkflow } from "../../../workflows/update-appointment-status"
import { getAppointmentsWorkflow } from "../../../workflows/get-appointments"
import { deleteAppointmentWorkflow } from "../../../workflows/delete-appointment"

export const GetAdminAppointmentsSchema = createFindParams().extend({
    status: z.enum(["scheduled", "completed", "cancelled", "rescheduled"]).optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    patient_name: z.string().optional(),
})

export const UpdateAppointmentStatusSchema = z.object({
    appointment_id: z.string(),
    status: z.enum(["scheduled", "completed", "cancelled", "rescheduled"]),
    cancellation_reason: z.string().optional(),
    doctor_notes: z.string().optional(),
})

export const DeleteAppointmentSchema = z.object({
    id: z.string(),
})

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const validatedQuery = GetAdminAppointmentsSchema.parse(req.query)
    const { limit, offset, status, start_date, end_date, patient_name } = validatedQuery

    const { result } = await getAppointmentsWorkflow(req.scope).run({
        input: {
            limit,
            offset,
            status,
            start_date,
            end_date,
            patient_name,
        },
    })

    res.json(result)
}

export const PATCH = async (
    req: MedusaRequest<z.infer<typeof UpdateAppointmentStatusSchema>>,
    res: MedusaResponse
) => {
    const validatedBody = UpdateAppointmentStatusSchema.parse(req.body)
    const { appointment_id, status, cancellation_reason, doctor_notes } = validatedBody

    const { result } = await updateAppointmentStatusWorkflow(req.scope).run({
        input: {
            appointment_id,
            status,
            cancellation_reason,
            doctor_notes,
        },
    })

    res.json({
        appointment: result.appointment,
        message: "Appointment status updated successfully",
    })
}

export const DELETE = async (
    req: MedusaRequest<z.infer<typeof DeleteAppointmentSchema>>,
    res: MedusaResponse
) => {
    const validatedBody = DeleteAppointmentSchema.parse(req.body)
    const { id } = validatedBody

    const { result } = await deleteAppointmentWorkflow(req.scope).run({
        input: {
            id,
        },
    })

    res.json({
        success: result,
        message: "Appointment deleted successfully",
    })
}
