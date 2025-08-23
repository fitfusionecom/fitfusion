import { model } from "@medusajs/framework/utils"

export const Info = model.define("info", {
    id: model.id().primaryKey(),
    product_id: model.text(),
    desc1: model.text(),
    desc2: model.text(),
    desc3: model.text(),
    banner: model.text(),
})