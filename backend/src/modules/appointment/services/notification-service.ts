import { APPOINTMENT_MODULE } from "../index"
import AppointmentModuleService from "../service"

interface NotificationData {
    patient_name: string
    contact_number: string
    appointment_date: string
    appointment_time: string
    status: string
    doctor_notes?: string
    cancellation_reason?: string
}

class NotificationService {
    private appointmentService: AppointmentModuleService

    constructor(appointmentService: AppointmentModuleService) {
        this.appointmentService = appointmentService
    }

    async sendAppointmentConfirmation(data: NotificationData): Promise<void> {
        const message = `Dear ${data.patient_name}, your appointment is confirmed for ${this.formatDate(data.appointment_date)} at ${this.formatTime(data.appointment_time)}. Please arrive 10 minutes early. - Fit Fusion Ayurveda`

        await this.sendSMS(data.contact_number, message)
        await this.sendEmail(data.contact_number, 'Appointment Confirmed', message)
    }

    async sendAppointmentUpdate(data: NotificationData): Promise<void> {
        let message = ''

        switch (data.status) {
            case 'completed':
                message = `Dear ${data.patient_name}, your appointment on ${this.formatDate(data.appointment_date)} has been completed. Thank you for choosing Fit Fusion Ayurveda!`
                break
            case 'cancelled':
                message = `Dear ${data.patient_name}, your appointment on ${this.formatDate(data.appointment_date)} at ${this.formatTime(data.appointment_time)} has been cancelled. ${data.cancellation_reason ? `Reason: ${data.cancellation_reason}` : ''} - Fit Fusion Ayurveda`
                break
            case 'rescheduled':
                message = `Dear ${data.patient_name}, your appointment has been rescheduled. New date: ${this.formatDate(data.appointment_date)} at ${this.formatTime(data.appointment_time)}. - Fit Fusion Ayurveda`
                break
        }

        if (message) {
            await this.sendSMS(data.contact_number, message)
            await this.sendEmail(data.contact_number, 'Appointment Update', message)
        }
    }

    async sendReminder(data: NotificationData): Promise<void> {
        const message = `Reminder: Dear ${data.patient_name}, you have an appointment tomorrow at ${this.formatTime(data.appointment_time)}. Please arrive 10 minutes early. - Fit Fusion Ayurveda`

        await this.sendSMS(data.contact_number, message)
    }

    private async sendSMS(contactNumber: string, message: string): Promise<void> {
        try {
            // Integration with SMS provider (e.g., Twilio, TextLocal, etc.)
            console.log(`SMS to ${contactNumber}: ${message}`)

            // Example with fetch to SMS API
            // const response = await fetch('https://api.textlocal.in/send/', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     apikey: process.env.SMS_API_KEY,
            //     numbers: contactNumber,
            //     message: message,
            //     sender: 'FITFUS'
            //   })
            // })
        } catch (error) {
            console.error('Error sending SMS:', error)
        }
    }

    private async sendEmail(contactNumber: string, subject: string, message: string): Promise<void> {
        try {
            // Integration with email provider (e.g., SendGrid, AWS SES, etc.)
            console.log(`Email to ${contactNumber}: ${subject} - ${message}`)

            // Example with fetch to email API
            // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            //   method: 'POST',
            //   headers: {
            //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({
            //     personalizations: [{
            //       to: [{ email: `${contactNumber}@example.com` }] // This would be actual email
            //     }],
            //     from: { email: 'noreply@fitfusionayurveda.com' },
            //     subject: subject,
            //     content: [{ type: 'text/plain', value: message }]
            //   })
            // })
        } catch (error) {
            console.error('Error sending email:', error)
        }
    }

    private formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    private formatTime(timeString: string): string {
        const [hours, minutes] = timeString.split(':')
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour % 12 || 12
        return `${displayHour}:${minutes} ${ampm}`
    }
}

export default NotificationService
