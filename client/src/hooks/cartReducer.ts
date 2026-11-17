// src/reducers/cartReducer.ts
import type { CartItem, Product } from "../types";

export type CartAction =
    | { type: "productAdded"; product: Product }
    | { type: "quantityChanged"; productId: number; quantity: number }
    | { type: "itemRemoved"; productId: number }
    | { type: "cartCleared" };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case "productAdded": {
        const existingItem = state.find(
            (item) => item.productId === action.product.id,
        );

        if (existingItem) {
            return state.map((item) =>
            item.productId === action.product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
        }

        return [
            ...state,
            {
            productId: action.product.id,
            name: action.product.name,
            quantity: 1,
            unitPrice: action.product.price ?? null,
            },
        ];
        }

        case "quantityChanged":
        return state.map((item) =>
            item.productId === action.productId
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item,
        );

        case "itemRemoved":
        return state.filter((item) => item.productId !== action.productId);

        case "cartCleared":
        return [];

        default:
        return state;
    }
}