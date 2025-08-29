"use server"
import { redirect } from "next/navigation"
import { updateCart } from "./cart"
import { revalidateTag } from "next/cache"
import { sdk } from "../config"
import { getAuthHeaders, getCacheTag } from "./cookies"
import medusaError from "../util/medusa-error"


// cartId,
export async function setAddressForBuyNow(currentState: unknown, formData: FormData) {
    const cartId = formData.get("cartId")

    if (!cartId) {
        throw new Error("No cart ID found when setting addresses")
    }

    try {

        if (!formData) {
            throw new Error("No form data found when setting addresses")
        }


        const data = {
            shipping_address: {
                first_name: formData.get("shipping_address.first_name"),
                last_name: formData.get("shipping_address.last_name"),
                address_1: formData.get("shipping_address.address_1"),
                address_2: "",
                company: formData.get("shipping_address.company"),
                postal_code: formData.get("shipping_address.postal_code"),
                city: formData.get("shipping_address.city"),
                country_code: formData.get("shipping_address.country_code"),
                province: formData.get("shipping_address.province"),
                phone: formData.get("shipping_address.phone"),
            },
            email: formData.get("email"),
        } as any

        data.billing_address = data.shipping_address

        const headers = {
            ...(await getAuthHeaders()),
        }

        await sdk.store.cart
            // @ts-ignore
            .update(cartId, data, {}, headers)
            .then(async ({ cart }) => {
                const cartCacheTag = await getCacheTag("carts")
                revalidateTag(cartCacheTag)
                return cart
            })
            .catch(medusaError)

    } catch (e: any) {
        console.log(e)
        return e.message
    }
    redirect(
        `/checkout?cartId=${cartId}&step=delivery`
    )
}