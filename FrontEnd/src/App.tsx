import { useEffect, useReducer, useState } from "react";
import { Carrinho } from "./components/Carrinho";
import { Extrato } from "./components/Extrato";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { fetchProducts } from "./services/products";
import type { ApiStatus, CartItem, Product } from "./types";

type CartAction =
  | { type: "productAdded"; product: Product }
  | { type: "quantityChanged"; productId: number; quantity: number }
  | { type: "itemRemoved"; productId: number }
  | { type: "cartCleared" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "productAdded": {
      const existingItem = state.find(
        (item) => item.productId === action.product.id,
      );

      if (existingItem) {
        return state.map((item) =>
          item.productId === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
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
        item.productId === action.productId ? { ...item, quantity: Math.max(1, action.quantity) } : item,
      );

    case "itemRemoved":
      return state.filter((item) => item.productId !== action.productId);

    case "cartCleared":
      return [];
  }
}

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [loadAttempt, setLoadAttempt] = useState(0);

  function retryProducts() {
    setApiStatus("checking");
    setProductsError(null);
    setLoadAttempt((attempt) => attempt + 1);
  }

  useEffect(() => {
    const controller = new AbortController();

    // IA
    fetchProducts(controller.signal)
      .then((loadedProducts) => {
        setProducts(loadedProducts);
        setApiStatus("connected");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Erro ao carregar produtos da API:", error);
        setProductsError(
          "Não foi possível carregar os produtos. Verifique a conexão com a API e tente novamente.",
        );
        setApiStatus("disconnected");
      });

    return () => controller.abort();
    // Cabou IA
  }, [loadAttempt]);

  const subtotal = cartItems.every((item) => item.unitPrice !== null)
    ? cartItems.reduce(
        (totalInCents, item) =>
          totalInCents + Math.round((item.unitPrice ?? 0) * 100) * item.quantity, 
        0,
      ) / 100
    : null;

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Header apiStatus={apiStatus} />
      <main className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-4">
        <Carrinho
          apiStatus={apiStatus}
          products={products}
          productsError={productsError}
          cartItems={cartItems}
          onAddProduct={(product) =>
            dispatch({ type: "productAdded", product })
          }
          onQuantityChange={(productId, quantity) =>
            dispatch({ type: "quantityChanged", productId, quantity })
          }
          onRemoveProduct={(productId) =>
            dispatch({ type: "itemRemoved", productId })
          }
          onRetryProducts={retryProducts}
        />
        <Extrato itemCount={itemCount} subtotal={subtotal} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
