"use client";

import { useCart } from "@/hooks/useCart";
import { useState } from "react";

export default function AddToCartTest() {
  const { addToCart, isAddingToCart } = useCart();
  const [variantId, setVariantId] = useState("test-variant-123");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await addToCart({ variantId, quantity });
      alert("Item added to cart! Check the cart popover.");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart. Check console for details.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Test Add to Cart</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Variant ID:
          </label>
          <input
            type="text"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter variant ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity:
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || !variantId}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          💡 <strong>Tip:</strong> After adding an item, click the cart icon in
          the header to see the popover!
        </p>
      </div>
    </div>
  );
}
