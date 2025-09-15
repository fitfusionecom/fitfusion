import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { createAppointmentWorkflow } from "../../../../../workflows/create-appointment"
import crypto from 'crypto'

export const VerifyPaymentSchema = z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
    patient_name: z.string().min(1),
    patient_age: z.number().min(1).max(120),
    patient_address: z.string().min(1),
    contact_number: z.string().min(10),
    problem: z.string().min(1),
    appointment_date: z.string().transform((str) => new Date(str)),
    appointment_time: z.string().regex(/^\d{2}:\d{2}$/),
})

export const POST = async (
    req: MedusaRequest<z.infer<typeof VerifyPaymentSchema>>,
    res: MedusaResponse
) => {
    const validatedBody = VerifyPaymentSchema.parse(req.body)
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        patient_name,
        patient_age,
        patient_address,
        contact_number,
        problem,
        appointment_date,
        appointment_time
    } = validatedBody

    try {
        // Verify payment signature
        const razorpayWebhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
        if (!razorpayWebhookSecret) {
            throw new Error('Razorpay webhook secret not configured')
        }

        const body = `${razorpay_order_id}|${razorpay_payment_id}`
        const expectedSignature = crypto
            .createHmac('sha256', razorpayWebhookSecret)
            .update(body)
            .digest('hex')

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                error: 'Invalid payment signature',
                message: 'Payment verification failed'
            })
        }

        // Create appointment with payment confirmation
        const { result } = await createAppointmentWorkflow(req.scope).run({
            input: {
                patient_name,
                patient_age,
                patient_address,
                contact_number,
                problem,
                appointment_date,
                appointment_time,
                payment_id: razorpay_payment_id,
            },
        })

        res.json({
            success: true,
            appointment: result.appointment,
            payment_id: razorpay_payment_id,
            message: 'Appointment booked successfully! You will receive a confirmation shortly.',
        })
    } catch (error) {
        console.error('Error verifying payment:', error)
        res.status(500).json({
            error: 'Payment verification failed',
            message: 'Please contact support if payment was deducted'
        })
    }
}
