import { model } from "@medusajs/framework/utils"

const DoctorAvailability = model.define("doctor_availability", {
    id: model.id().primaryKey(),
    date: model.dateTime(),
    is_available: model.boolean().default(true),
    unavailable_reason: model.text().nullable(), // "holiday", "leave", "emergency", "conference", "training"
    max_slots: model.number().default(10),
    slot_duration: model.number().default(15), // minutes
    notes: model.text().nullable(), // Additional notes about unavailability
})

export default DoctorAvailability
