import { defineLink } from "@medusajs/framework/utils"
import Info from "../modules/info"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
    {
        linkable: Info.linkable.info,
        field: "product_id",
        isList: false,
    },
    ProductModule.linkable.product,
    {
        readOnly: true,
    }
)
