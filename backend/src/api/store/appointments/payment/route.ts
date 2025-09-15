import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { createAppointmentWorkflow } from "../../../../workflows/create-appointment"

export const CreatePaymentOrderSchema = z.object({
    patient_name: z.string().min(1),
    patient_age: z.number().min(1).max(120),
    patient_address: z.string().min(1),
    contact_number: z.string().min(10),
    problem: z.string().min(1),
    appointment_date: z.string().transform((str) => new Date(str)),
    appointment_time: z.string().regex(/^\d{2}:\d{2}$/),
})

export const POST = async (
    req: MedusaRequest<z.infer<typeof CreatePaymentOrderSchema>>,
    res: MedusaResponse
) => {
    const validatedBody = CreatePaymentOrderSchema.parse(req.body)
    const { patient_name, patient_age, patient_address, contact_number, problem, appointment_date, appointment_time } = validatedBody

    try {
        // Create Razorpay order
        const razorpay = require('razorpay')
        const instance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })

        const orderOptions = {
            amount: 9900, // ₹99 in paise
            currency: 'INR',
            receipt: `apt_${Date.now()}`,
            notes: {
                patient_name,
                appointment_date: appointment_date.toISOString().split('T')[0],
                appointment_time,
                problem,
            }
        }

        const order = await instance.orders.create(orderOptions)

        res.json({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID,
            name: 'Fit Fusion Ayurveda',
            description: 'Consultation Fee',
            prefill: {
                name: patient_name,
                contact: contact_number,
            },
            notes: {
                patient_name,
                patient_age,
                patient_address,
                contact_number,
                problem,
                appointment_date: appointment_date.toISOString(),
                appointment_time,
            }
        })
    } catch (error) {
        console.error('Error creating payment order:', error)
        res.status(500).json({
            error: 'Failed to create payment order',
            message: 'Please try again later'
        })
    }
}
