import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { APPOINTMENT_MODULE } from "../../modules/appointment"
import AppointmentModuleService from "../../modules/appointment/service"
import NotificationService from "../../modules/appointment/services/notification-service"

export type SendAppointmentNotificationStepInput = {
    appointment_id: string
    notification_type: 'confirmation' | 'update' | 'reminder'
}

export const sendAppointmentNotificationStep = createStep(
    "send-appointment-notification-step",
    async (input: SendAppointmentNotificationStepInput, { container }) => {
        const appointmentModuleService: AppointmentModuleService = container.resolve(
            APPOINTMENT_MODULE
        )

        // Get appointment details
        const appointment = await appointmentModuleService.retrieveAppointment(input.appointment_id)

        if (!appointment) {
            throw new Error('Appointment not found')
        }

        const notificationService = new NotificationService(appointmentModuleService)

        const notificationData = {
            patient_name: appointment.patient_name,
            contact_number: appointment.contact_number,
            appointment_date: appointment.appointment_date,
            appointment_time: appointment.appointment_time,
            status: appointment.status,
            doctor_notes: appointment.doctor_notes,
            cancellation_reason: appointment.cancellation_reason,
        }

        switch (input.notification_type) {
            case 'confirmation':
                // @ts-ignore   
                await notificationService.sendAppointmentConfirmation(notificationData)
                break
            case 'update':
                // @ts-ignore   
                await notificationService.sendAppointmentUpdate(notificationData)
                break
            case 'reminder':
                // @ts-ignore   
                await notificationService.sendReminder(notificationData)
                break
        }

        return new StepResponse({ success: true }, { success: true })
    }
)
