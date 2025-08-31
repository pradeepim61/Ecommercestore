import { useClearBasketMutation, useFetchBasketQuery } from "../../features/basket/basketApi";

export const useBasket = () => {
    const { data: basket } = useFetchBasketQuery();
    const [clearBasket] = useClearBasketMutation();

    const subtotal = basket?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
    const deliveryFee = subtotal >= 10000 ? 0 : 500; // Compare against 10000 cents ($100.00)

    return {
        basket,
        subtotal,
        deliveryFee,
        total: subtotal ? subtotal + deliveryFee : 0,
        clearBasket
    }
}