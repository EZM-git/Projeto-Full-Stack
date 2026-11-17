export interface Product {
  id: number;
  name: string;
  price?: number;
}

export interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number | null;
}

export type ApiStatus = "checking" | "connected" | "disconnected";

