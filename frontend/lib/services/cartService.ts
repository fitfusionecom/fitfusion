import { sdk } from "@/lib/config";
import { HttpTypes } from "@medusajs/types";

// Get cart ID from cookies (client-side)
const getCartId = (): string | null => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  const cartCookie = cookies.find(cookie => cookie.trim().startsWith("_medusa_cart_id="));

  if (cartCookie) {
    return cartCookie.split("=")[1];
  }

  return null;
};

// Set cart ID in cookies (client-side)
const setCartId = (cartId: string): void => {
  if (typeof window === "undefined") return;

  document.cookie = `_medusa_cart_id=${cartId}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days
};

// Remove cart ID from cookies (client-side)
const removeCartId = (): void => {
  if (typeof window === "undefined") return;

  document.cookie = "_medusa_cart_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

// Client-side cart functions for React Query
export const cartService = {
  // Retrieve cart
  async retrieveCart(): Promise<HttpTypes.StoreCart | null> {
    console.log("retrieveCart called");
    const cartId = getCartId();

    if (!cartId) {
      console.log("No cart ID found in cookies");
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

      console.log("Cart retrieved successfully:", response.cart?.id);
      return response.cart;
    } catch (error) {
      console.error("Error retrieving cart:", error);
      return null;
    }
  },

  // Create or get cart
  async getOrSetCart(countryCode: string = "in"): Promise<HttpTypes.StoreCart> {
    let cart = await this.retrieveCart();

    if (!cart) {
      const regionId = process.env.NEXT_PUBLIC_REGION_ID;

      if (!regionId) {
        throw new Error("Region ID not configured");
      }

      console.log("Creating new cart with region:", regionId);
      const cartResp = await sdk.store.cart.create({ region_id: regionId });
      cart = cartResp.cart;

      setCartId(cart.id);
      console.log("New cart created:", cart.id);
    }

    return cart;
  },

  // Add item to cart
  async addToCart(variantId: string, quantity: number, countryCode: string = "in"): Promise<HttpTypes.StoreCart> {
    if (!variantId) {
      throw new Error("Missing variant ID when adding to cart");
    }

    console.log("Adding to cart:", { variantId, quantity });
    const cart = await this.getOrSetCart(countryCode);

    const response = await sdk.store.cart.createLineItem(cart.id, {
      variant_id: variantId,
      quantity,
    });

    console.log("Item added to cart successfully");
    return response.cart;
  },

  // Update line item quantity
  async updateLineItem(lineId: string, quantity: number): Promise<void> {
    if (!lineId) {
      throw new Error("Missing lineItem ID when updating line item");
    }

    const cartId = getCartId();

    if (!cartId) {
      throw new Error("Missing cart ID when updating line item");
    }

    console.log("Updating line item:", { lineId, quantity, cartId });

    try {
      const response = await sdk.store.cart.updateLineItem(cartId, lineId, { quantity });
      console.log("Line item updated successfully, response:", response);
    } catch (error) {
      console.error("Error updating line item:", error);
      throw error;
    }
  },

  // Delete line item
  async deleteLineItem(lineId: string): Promise<void> {
    if (!lineId) {
      throw new Error("Missing lineItem ID when deleting line item");
    }

    const cartId = getCartId();

    if (!cartId) {
      throw new Error("Missing cart ID when deleting line item");
    }

    console.log("Deleting line item:", { lineId, cartId });

    try {
      const response = await sdk.store.cart.deleteLineItem(cartId, lineId);
      console.log("Line item deleted successfully, response:", response);
    } catch (error) {
      console.error("Error deleting line item:", error);
      throw error;
    }
  },

  // Update cart
  async updateCart(data: HttpTypes.StoreUpdateCart): Promise<HttpTypes.StoreCart> {
    const cartId = getCartId();

    if (!cartId) {
      throw new Error("No existing cart found, please create one before updating");
    }

    const response = await sdk.store.cart.update(cartId, data);
    return response.cart;
  },

  // Clear cart
  clearCart(): void {
    removeCartId();
  },

  // Refresh cart data (useful after operations)
  async refreshCart(): Promise<HttpTypes.StoreCart | null> {
    const cartId = getCartId();

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
      console.error("Error refreshing cart:", error);
      return null;
    }
  }
};
