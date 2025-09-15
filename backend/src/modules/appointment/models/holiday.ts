import { model } from "@medusajs/framework/utils"

const Holiday = model.define("holiday", {
    id: model.id().primaryKey(),
    name: model.text(),
    date: model.dateTime(),
    is_recurring: model.boolean().default(false), // for annual holidays
    description: model.text().nullable(),
})

export default Holiday
