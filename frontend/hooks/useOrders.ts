import { useQuery, useQueryClient } from "react-query";
import { ordersService } from "@/lib/services/ordersService";

export const useOrders = (limit: number = 10, offset: number = 0) => {
    const queryClient = useQueryClient();

    const {
        data: orders,
        isLoading,
        error,
        refetch,
        isError,
    } = useQuery({
        queryKey: ["orders", limit, offset],
        queryFn: () => ordersService.listOrders(limit, offset),
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        retry: (failureCount, error: any) => {
            // Don't retry on authentication errors
            if (error?.message?.includes("Authentication failed")) {
                return false;
            }
            return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    const invalidateOrders = () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
    };

    return {
        orders: orders || [],
        isLoading,
        error,
        refetch,
        isError,
        invalidateOrders,
    };
};

export const useOrder = (orderId: string) => {
    const {
        data: order,
        isLoading,
        error,
        refetch,
        isError,
    } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => ordersService.getOrder(orderId),
        enabled: !!orderId, // Only run if orderId exists
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        retry: (failureCount, error: any) => {
            if (error?.message?.includes("Authentication failed")) {
                return false;
            }
            return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    return {
        order,
        isLoading,
        error,
        refetch,
        isError,
    };
};
