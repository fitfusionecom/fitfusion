import { useMutation } from "react-query";
import { buyNowService } from "@/lib/services/buyNowService";
import { useRouter } from "next/navigation";

export const useBuyNow = () => {
  const router = useRouter();

  // Buy now mutation
  const buyNowMutation = useMutation({
    mutationFn: ({ variantId, quantity, countryCode }: {
      variantId: string;
      quantity: number;
      countryCode?: string;
    }) => buyNowService.createBuyNowCart(variantId, quantity, countryCode),
    onSuccess: ({ cartId }) => {
      console.log("Buy now successful, redirecting to checkout with cart ID:", cartId);
      // Redirect to buy now checkout page with the cart ID
      router.push(`/checkout?cartId=${cartId}&step=address`);
    },
    onError: (error) => {
      console.error("Error in buy now:", error);
      // You can add toast notification here if needed
    },
  });

  return {
    buyNow: buyNowMutation.mutateAsync,
    isBuyingNow: buyNowMutation.isLoading,
    buyNowError: buyNowMutation.error,
  };
};
