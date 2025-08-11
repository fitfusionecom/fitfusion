import { useMutation, useQueryClient } from "react-query";
import { cartService } from "@/lib/services/cartService";

export const useCart = () => {
  const queryClient = useQueryClient();

  // Add item to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: ({ variantId, quantity, countryCode }: {
      variantId: string;
      quantity: number;
      countryCode?: string;
    }) => cartService.addToCart(variantId, quantity, countryCode),
    onSuccess: () => {
      console.log("Add to cart successful, invalidating queries");
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
    },
  });

  // Update line item mutation
  const updateLineItemMutation = useMutation({
    mutationFn: ({ lineId, quantity }: { lineId: string; quantity: number }) => {
      console.log("Updating line item:", { lineId, quantity });
      return cartService.updateLineItem(lineId, quantity);
    },
    onSuccess: () => {
      console.log("Update line item successful, invalidating queries");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error updating line item:", error);
    },
  });

  // Delete line item mutation
  const deleteLineItemMutation = useMutation({
    mutationFn: (lineId: string) => {
      console.log("Deleting line item:", lineId);
      return cartService.deleteLineItem(lineId);
    },
    onSuccess: () => {
      console.log("Delete line item successful, invalidating queries");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error deleting line item:", error);
    },
  });

  // Refresh cart mutation
  const refreshCartMutation = useMutation({
    mutationFn: () => cartService.refreshCart(),
    onSuccess: () => {
      console.log("Refresh cart successful, invalidating queries");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error refreshing cart:", error);
    },
  });

  return {
    addToCart: addToCartMutation.mutateAsync,
    updateLineItem: updateLineItemMutation.mutateAsync,
    deleteLineItem: deleteLineItemMutation.mutateAsync,
    refreshCart: refreshCartMutation.mutateAsync,
    isAddingToCart: addToCartMutation.isLoading,
    isUpdatingItem: updateLineItemMutation.isLoading,
    isDeletingItem: deleteLineItemMutation.isLoading,
    isRefreshing: refreshCartMutation.isLoading,
  };
};
