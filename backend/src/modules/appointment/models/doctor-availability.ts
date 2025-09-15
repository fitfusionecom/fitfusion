import { model } from "@medusajs/framework/utils"

const DoctorAvailability = model.define("doctor_availability", {
    id: model.id().primaryKey(),
    date: model.dateTime(),
    is_available: model.boolean().default(true),
    unavailable_reason: model.text().nullable(), // "holiday", "leave", "emergency", "conference", "training"
    unavailable_type: model.text().nullable(), // "full_day", "partial_day", "specific_hours"
    start_time: model.text().nullable(), // "14:00" for 2:00 PM
    end_time: model.text().nullable(), // "18:00" for 6:00 PM
    max_slots: model.number().default(10),
    slot_duration: model.number().default(15), // minutes
    notes: model.text().nullable(), // Additional notes about unavailability
})

export default DoctorAvailability
