import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { APPOINTMENT_MODULE } from "../../../../modules/appointment"
import AppointmentModuleService from "../../../../modules/appointment/service"

export const GetAppointmentStatsSchema = z.object({
    start_date: z.string().transform((str) => new Date(str)),
    end_date: z.string().transform((str) => new Date(str)),
})

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const validatedQuery = GetAppointmentStatsSchema.parse(req.query)
    const { start_date, end_date } = validatedQuery

    const appointmentModuleService: AppointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

    const stats = await appointmentModuleService.getAppointmentStats(start_date, end_date)

    // Calculate totals
    const totalAppointments = stats.reduce((sum: number, stat: any) => sum + parseInt(stat.count), 0)
    const totalRevenue = stats.reduce((sum: number, stat: any) => sum + (parseInt(stat.total_revenue) || 0), 0)

    const statusBreakdown = stats.reduce((acc: any, stat: any) => {
        acc[stat.status] = {
            count: parseInt(stat.count),
            revenue: parseInt(stat.total_revenue) || 0,
        }
        return acc
    }, {})

    res.json({
        total_appointments: totalAppointments,
        total_revenue: totalRevenue,
        status_breakdown: statusBreakdown,
        period: {
            start_date: start_date.toISOString().split('T')[0],
            end_date: end_date.toISOString().split('T')[0],
        },
    })
}
