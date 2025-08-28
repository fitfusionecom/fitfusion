import { sdk } from "@/lib/config";
import { HttpTypes } from "@medusajs/types";

// Buy Now service - creates temporary cart for immediate checkout
export const buyNowService = {
  // Create a new temporary cart and add product
  async createBuyNowCart(variantId: string, quantity: number, countryCode: string = "in"): Promise<{ cartId: string; cart: HttpTypes.StoreCart }> {
    if (!variantId) {
      throw new Error("Missing variant ID for buy now");
    }

    const regionId = process.env.NEXT_PUBLIC_REGION_ID;
    if (!regionId) {
      throw new Error("Region ID not configured");
    }

    try {
      // Create a completely new cart
      console.log("Creating new buy now cart with region:", regionId);
      const cartResp = await sdk.store.cart.create({ region_id: regionId });
      const cart = cartResp.cart;

      // Add the product to this new cart
      console.log("Adding product to buy now cart:", { variantId, quantity });
      const response = await sdk.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity,
      });

      console.log("Buy now cart created successfully:", cart.id);
      
      return {
        cartId: cart.id,
        cart: response.cart
      };
    } catch (error) {
      console.error("Error creating buy now cart:", error);
      throw error;
    }
  },

  // Get buy now cart by ID (for checkout page)
  async getBuyNowCart(cartId: string): Promise<HttpTypes.StoreCart | null> {
    if (!cartId) {
      return null;
    }

    try {
      const response = await sdk.client.fetch<HttpTypes.StoreCartResponse>(
        `/store/carts/${cartId}`,
        {
          method: "GET",
          query: {
            fields: "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name",
          },
          cache: "no-cache",
        }
      );

      return response.cart;
    } catch (error) {
      console.error("Error retrieving buy now cart:", error);
      return null;
    }
  }
};
