import { sdk } from "../config"
import { HttpTypes } from "@medusajs/types"
import { getRegion } from "./regions"
import { retrieveRegion } from "./regions"
import { getAuthHeaders, getCacheOptions } from "./cookies"


export const filterProducts = async ({
    q,
    minPrice,
    maxPrice,
    category_handle,
    pageParam = 1,
}: {
    q: string
    minPrice: string
    maxPrice: string
    category_handle: string
    pageParam: number
}) => {
    const region_id = process.env.NEXT_PUBLIC_REGION_ID
    const response = await sdk.client.fetch<any>(
        `/store/search?region_id=${region_id}&currency_code=inr&q=${q}&price_min=${minPrice}&price_max=${maxPrice}&category_handle=${category_handle}&offset=${(pageParam - 1) * 20
        }`,
        {
            cache: "no-cache",
        }
    )
    return response?.result?.products as any
}


export const listProducts = async ({
    pageParam = 1,
    queryParams,
    countryCode,
    regionId,
}: {
    pageParam?: number
    queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
    countryCode?: string
    regionId?: string
}): Promise<{
    response: { products: HttpTypes.StoreProduct[]; count: number }
    nextPage: number | null
    queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
    if (!countryCode && !regionId) {
        throw new Error("Country code or region ID is required")
    }

    const limit = queryParams?.limit || 12
    const _pageParam = Math.max(pageParam, 1)
    const offset = (_pageParam - 1) * limit

    let region: HttpTypes.StoreRegion | undefined | null

    if (countryCode) {
        region = await getRegion(countryCode)
    } else {
        // @ts-ignore
        region = await retrieveRegion(regionId!)
    }

    if (!region) {
        return {
            response: { products: [], count: 0 },
            nextPage: null,
        }
    }

    const headers = {
        ...(await getAuthHeaders()),
    }

    const next = {
        ...(await getCacheOptions("products")),
    }

    return sdk.client
        .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
            `/store/products`,
            {
                method: "GET",
                query: {
                    limit,
                    offset,
                    region_id: region?.id,
                    fields:
                        "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags,*variants.inventory_items,*variants.inventory",
                    ...queryParams,
                },
                headers,
                next,
                cache: "force-cache",
            }
        )
        .then(({ products, count }) => {
            const nextPage = count > offset + limit ? pageParam + 1 : null

            return {
                response: {
                    products,
                    count,
                },
                nextPage: nextPage,
                queryParams,
            }
        })
};
