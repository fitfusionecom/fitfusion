import { sdk } from "@/lib/config";
import { HttpTypes } from "@medusajs/types";


export const ordersService = {
    // Client-side function to fetch orders
    async listOrders(limit: number = 10, offset: number = 0) {
        try {
            // First try the API route (server-side with proper auth)
            const apiResponse = await fetch(`/api/orders?limit=${limit}&offset=${offset}`, {
                method: "GET",
                credentials: "include", // Important for cookies
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (apiResponse.ok) {
                const data = await apiResponse.json();
                if (data.success) {
                    return data.orders || [];
                }
            }

            // Fallback to direct API call if API route fails
            const token = this.getAuthToken();

            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include", // Important for cookies
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Token expired or invalid
                    this.clearAuthToken();
                    throw new Error("Authentication failed");
                }
                throw new Error(`Failed to fetch orders: ${response.statusText}`);
            }

            const data = await response.json();
            return data.orders || [];
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    },

    // Get auth token from various sources
    getAuthToken(): string | null {
        // Try to get from localStorage first (for client-side)
        if (typeof window !== "undefined") {
            return localStorage.getItem("_medusa_jwt") ||
                this.getCookieValue("_medusa_jwt");
        }
        return null;
    },

    // Helper to get cookie value
    getCookieValue(name: string): string | null {
        if (typeof document === "undefined") return null;

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || null;
        }
        return null;
    },

    // Clear auth token
    clearAuthToken() {
        if (typeof window !== "undefined") {
            localStorage.removeItem("_medusa_jwt");
            // Also try to clear the cookie
            document.cookie = "_medusa_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    },

    // Get single order
    async getOrder(id: string) {
        try {
            // First try the API route (server-side with proper auth)
            const apiResponse = await fetch(`/api/orders/${id}`, {
                method: "GET",
                credentials: "include", // Important for cookies
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (apiResponse.ok) {
                const data = await apiResponse.json();
                if (data.success) {
                    return data.order || null;
                }
            }

            // Fallback to direct API call if API route fails
            const token = this.getAuthToken();

            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/orders/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
                cache: "no-store",
            });

            if (!response.ok) {
                if (response.status === 401) {
                    this.clearAuthToken();
                    throw new Error("Authentication failed");
                }
                throw new Error(`Failed to fetch order: ${response.statusText}`);
            }

            const data = await response.json();
            return data.order;
        } catch (error) {
            console.error("Error fetching order:", error);
            throw error;
        }
    },

    // Cancel order with reason (Public API - Uses publishable API key)
    async cancelOrder(orderId: string, cancellationReason: string, cancelledBy?: string) {
        try {
            const data = await sdk.client.fetch(`/store/orders/${orderId}/cancel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    cancellation_reason: cancellationReason,
                    cancelled_by: cancelledBy,
                    no_notification: false
                },
            });

            return data;
        } catch (error) {
            console.error("Error cancelling order:", error);
            throw error;
        }
    }
};
