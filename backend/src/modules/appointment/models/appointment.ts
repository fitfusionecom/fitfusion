import { model } from "@medusajs/framework/utils"

const Appointment = model.define("appointment", {
    id: model.id().primaryKey(),
    patient_name: model.text(),
    patient_age: model.number(),
    patient_address: model.text(),
    contact_number: model.text(),
    problem: model.text(), // dropdown selection
    appointment_date: model.dateTime(),
    appointment_time: model.text(), // 15-minute slots
    status: model.enum(["scheduled", "completed", "cancelled", "rescheduled"]).default("scheduled"),
    payment_status: model.enum(["pending", "paid", "refunded"]).default("pending"),
    payment_id: model.text().nullable(),
    consultation_fee: model.number().default(99), // ₹99
    doctor_notes: model.text().nullable(),
    cancellation_reason: model.text().nullable(),
    rescheduled_from: model.text().nullable(), // original appointment ID if rescheduled
})

export default Appointment
