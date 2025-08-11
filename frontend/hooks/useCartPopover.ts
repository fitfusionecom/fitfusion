import { useCartContext } from "@/lib/context/cart-context";

export const useCartPopover = () => {
    const { isCartPopoverOpen, openCartPopover, closeCartPopover } = useCartContext();

    return {
        isOpen: isCartPopoverOpen,
        open: openCartPopover,
        close: closeCartPopover,
    };
};
