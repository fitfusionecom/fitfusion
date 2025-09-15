import { InjectManager, MedusaService, MedusaContext } from "@medusajs/framework/utils"
import Appointment from "./models/appointment"
import DoctorAvailability from "./models/doctor-availability"
import Holiday from "./models/holiday"
import { Context } from "@medusajs/framework/types"
import { EntityManager } from "@mikro-orm/knex"

class AppointmentModuleService extends MedusaService({
    Appointment,
    DoctorAvailability,
    Holiday,
}) {
    @InjectManager()
    async createAppointment(
        data: {
            patient_name: string
            patient_age: number
            patient_address: string
            contact_number: string
            problem: string
            appointment_date: Date
            appointment_time: string
            payment_id?: string
        },
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<{ success: boolean; appointment?: any; error?: string }> {
        // Check if slot is available
        const slotCheck = await this.isSlotAvailable(data.appointment_date, data.appointment_time, sharedContext)
        if (!slotCheck.available) {
            return {
                success: false,
                error: slotCheck.reason || "Selected time slot is not available"
            }
        }

        const appointmentData = {
            ...data,
            payment_status: data.payment_id ? "paid" as const : "pending" as const,
        }

        const appointment = await this.createAppointments(appointmentData)
        return {
            success: true,
            appointment
        }
    }

    @InjectManager()
    async isSlotAvailable(
        date: Date | string,
        time: string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<{ available: boolean; reason?: string }> {
        // Ensure date is a Date object
        const appointmentDate = date instanceof Date ? date : new Date(date)

        // Check if it's a Monday (doctor's day off)
        if (appointmentDate.getDay() === 1) {
            return { available: false, reason: "Doctor is not available on Mondays" }
        }

        // Check if it's a holiday
        const holiday = await this.isHoliday(appointmentDate, sharedContext)
        if (holiday) {
            return { available: false, reason: `Doctor is not available due to holiday: ${holiday.name}` }
        }

        // Check if doctor is unavailable for this date
        const unavailability = await this.getDoctorAvailability(appointmentDate, sharedContext)

        // If no unavailability record exists, doctor is available by default
        if (unavailability && !unavailability.is_available) {
            // Doctor is unavailable for the entire day
            if (unavailability.unavailable_type === 'full_day') {
                return {
                    available: false,
                    reason: `Doctor is unavailable for the entire day: ${unavailability.unavailable_reason}`
                }
            }

            // Doctor is unavailable for partial day - check if requested time falls within unavailable hours
            if (unavailability.unavailable_type === 'partial_day' && unavailability.start_time && unavailability.end_time) {
                const timeHour = parseInt(time.split(':')[0])
                const timeMinute = parseInt(time.split(':')[1])
                const requestedTime = timeHour * 60 + timeMinute

                const [startHour, startMinute] = unavailability.start_time.split(':').map(Number)
                const [endHour, endMinute] = unavailability.end_time.split(':').map(Number)
                const unavailableStartTime = startHour * 60 + startMinute
                const unavailableEndTime = endHour * 60 + endMinute

                // If requested time falls within unavailable hours
                if (requestedTime >= unavailableStartTime && requestedTime < unavailableEndTime) {
                    return {
                        available: false,
                        reason: `Doctor is unavailable from ${unavailability.start_time} to ${unavailability.end_time}: ${unavailability.unavailable_reason}`
                    }
                }
            }
        }

        // Default working hours (2:00 PM - 6:00 PM) - doctor is available during these hours
        const timeHour = parseInt(time.split(':')[0])
        if (timeHour < 14 || timeHour >= 18) {
            return { available: false, reason: "Doctor is only available between 2:00 PM and 6:00 PM" }
        }

        // Check if slot is already booked
        const existingAppointments = await this.getAppointmentsByDateTime(appointmentDate, time, sharedContext)
        if (existingAppointments.length > 0) {
            return { available: false, reason: "This time slot is already booked" }
        }

        return { available: true }
    }

    @InjectManager()
    async isHoliday(
        date: Date | string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any> {
        const appointmentDate = date instanceof Date ? date : new Date(date)
        const dateStr = appointmentDate.toISOString().split('T')[0]
        const result = await sharedContext?.manager?.execute(
            "SELECT * FROM holiday WHERE date::date = ? OR (is_recurring = true AND EXTRACT(MONTH FROM date) = ? AND EXTRACT(DAY FROM date) = ?)",
            [dateStr, appointmentDate.getMonth() + 1, appointmentDate.getDate()]
        )
        return result?.[0] || null
    }

    @InjectManager()
    async getDoctorAvailability(
        date: Date | string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any> {
        const appointmentDate = date instanceof Date ? date : new Date(date)
        const dateStr = appointmentDate.toISOString().split('T')[0]
        const result = await sharedContext?.manager?.execute(
            "SELECT * FROM doctor_availability WHERE date::date = ?",
            [dateStr]
        )
        return result?.[0] || null
    }

    @InjectManager()
    async getAppointmentsByDateTime(
        date: Date | string,
        time: string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any[]> {
        const appointmentDate = date instanceof Date ? date : new Date(date)
        const dateStr = appointmentDate.toISOString().split('T')[0]
        const result = await sharedContext?.manager?.execute(
            "SELECT * FROM appointment WHERE appointment_date::date = ? AND appointment_time = ? AND status IN ('scheduled', 'rescheduled')",
            [dateStr, time]
        )
        return result || []
    }

    @InjectManager()
    async getAvailableSlots(
        date: Date | string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<string[]> {
        const appointmentDate = date instanceof Date ? date : new Date(date)
        const slots: string[] = []
        const startHour = 14 // 2:00 PM
        const endHour = 18 // 6:00 PM
        const slotDuration = 15 // minutes

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += slotDuration) {
                const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
                const slotCheck = await this.isSlotAvailable(appointmentDate, timeStr, sharedContext)
                if (slotCheck.available) {
                    slots.push(timeStr)
                }
            }
        }

        return slots
    }

    @InjectManager()
    async updateAppointmentStatus(
        appointmentId: string,
        status: "scheduled" | "completed" | "cancelled" | "rescheduled",
        cancellation_reason?: string,
        doctor_notes?: string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any> {
        const updateData: any = {
            status,
            updated_at: new Date(),
        }

        // Update payment status based on appointment status
        if (status === "completed") {
            updateData.payment_status = "paid"
        } else if (status === "scheduled") {
            // If reverting to scheduled status, reset payment status to pending
            // This handles the case where a completed appointment is being reverted
            updateData.payment_status = "pending"
        }

        if (cancellation_reason) {
            updateData.cancellation_reason = cancellation_reason
        }

        if (doctor_notes) {
            updateData.doctor_notes = doctor_notes
        }

        return await this.updateAppointments({ id: appointmentId, ...updateData })
    }

    @InjectManager()
    async getAppointmentsByDateRange(
        startDate: Date,
        endDate: Date,
        status?: string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any[]> {
        // Use date casting to compare only the date part, not the time
        let query = "SELECT * FROM appointment WHERE appointment_date::date >= ? AND appointment_date::date <= ?"
        const params: any[] = [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]

        if (status) {
            query += " AND status = ?"
            params.push(status)
        }

        query += " ORDER BY appointment_date, appointment_time"

        const result = await sharedContext?.manager?.execute(query, params)
        return result || []
    }

    @InjectManager()
    async listAppointmentsWithFilters(
        filters: {
            status?: "scheduled" | "completed" | "cancelled" | "rescheduled"
            patient_name?: string
        } = {},
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any[]> {
        let query = "SELECT * FROM appointment WHERE 1=1"
        const params: any[] = []

        if (filters.status) {
            query += " AND status = ?"
            params.push(filters.status)
        }

        if (filters.patient_name) {
            query += " AND patient_name LIKE ?"
            params.push(`%${filters.patient_name}%`)
        }

        query += " ORDER BY appointment_date, appointment_time"

        const result = await sharedContext?.manager?.execute(query, params)
        return result || []
    }

    @InjectManager()
    async getAppointmentStats(
        startDate: Date,
        endDate: Date,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any> {
        const result = await sharedContext?.manager?.execute(`
      SELECT 
        status,
        COUNT(*) as count,
        SUM(consultation_fee) as total_revenue
      FROM appointment 
      WHERE appointment_date >= ? AND appointment_date <= ?
      GROUP BY status
    `, [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]])

        return result || []
    }

    @InjectManager()
    async createHoliday(
        data: {
            name: string
            date: Date
            is_recurring?: boolean
            description?: string
        },
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any> {
        return await this.createHolidays(data)
    }


    @InjectManager()
    async updateDoctorAvailability(
        date: Date,
        is_available: boolean,
        unavailable_reason?: string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any> {
        const existing = await this.getDoctorAvailability(date, sharedContext)

        if (existing) {
            return await this.updateDoctorAvailabilities({
                is_available,
                unavailable_reason,
            }, { id: existing.id })
        } else {
            return await this.createDoctorAvailabilities({
                date,
                is_available,
                unavailable_reason,
                max_slots: 10,
                slot_duration: 15
            })
        }
    }

    @InjectManager()
    async setDoctorUnavailable(
        data: {
            date: Date | string
            unavailable_reason: string
            unavailable_type: 'full_day' | 'partial_day' | 'specific_hours'
            start_time?: string
            end_time?: string
            notes?: string
        },
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any> {
        const appointmentDate = data.date instanceof Date ? data.date : new Date(data.date)

        // Check if unavailability record already exists
        const existing = await this.getDoctorAvailability(appointmentDate, sharedContext)

        if (existing) {
            // Update existing record to unavailable
            return await this.updateDoctorAvailabilities({
                is_available: false,
                unavailable_reason: data.unavailable_reason,
                unavailable_type: data.unavailable_type,
                start_time: data.start_time,
                end_time: data.end_time,
                notes: data.notes
            }, { id: existing.id })
        } else {
            // Create new unavailability record
            return await this.createDoctorAvailabilities({
                date: appointmentDate,
                is_available: false,
                unavailable_reason: data.unavailable_reason,
                unavailable_type: data.unavailable_type,
                start_time: data.start_time,
                end_time: data.end_time,
                notes: data.notes,
                max_slots: 0, // No slots available
                slot_duration: 15
            })
        }
    }

    @InjectManager()
    async setDoctorAvailable(
        date: Date | string,
        @MedusaContext() sharedContext?: Context<EntityManager>
    ): Promise<any> {
        const appointmentDate = date instanceof Date ? date : new Date(date)

        // Check if unavailability record exists
        const existing = await this.getDoctorAvailability(appointmentDate, sharedContext)

        if (existing) {
            // Remove the unavailability record (doctor becomes available by default)
            return await this.deleteDoctorAvailabilities(existing.id)
        } else {
            // Doctor is already available (no unavailability record exists)
            return { message: "Doctor is already available for this date" }
        }
    }
}

export default AppointmentModuleService
