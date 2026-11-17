import { useEffect, useReducer, useState } from "react";
import { Carrinho } from "./components/Carrinho";
import { Extrato } from "./components/Extrato";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { fetchProducts } from "./services/products";
import type { ApiStatus, Product } from "./types";
import api from "./services/api"

import { cartReducer } from "./hooks/cartReducer";


function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [isWithBlur, setIsWithBlur] = useState<boolean>(false);

  const [cartItems, dispatch] = useReducer(cartReducer, []);

  function retryProducts() {
    setApiStatus("checking");
    setProductsError(null);
    setLoadAttempt((attempt) => attempt + 1);
  }

  function handleNewSell() {
    setIsWithBlur(true)
  }

  function confirmNewSell() {
    dispatch({ type: "cartCleared" }); 
    setIsWithBlur(false);
  }

  function cancelNewSell() {
    setIsWithBlur(false);
  }

  useEffect(() => {
    // IA
    const controller = new AbortController();

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
      <Footer handleNewSell={handleNewSell} handleEndSell={handleNewSell}/>
      {isWithBlur && (
          <div
            onClick={cancelNewSell}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar dentro da caixinha
              className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6 text-center shadow-2xl mx-4"
            >
              <h2 className="mb-2 text-lg font-bold text-white">
                Iniciar nova venda?
              </h2>
              <p className="mb-6 text-sm text-slate-400">
                Todos os itens atuais do carrinho serão removidos.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={cancelNewSell}
                  className="flex-1 rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-rose-700 transition"
                >
                  Não
                </button>
                <button
                  onClick={confirmNewSell}
                  className="flex-1 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 transition"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
