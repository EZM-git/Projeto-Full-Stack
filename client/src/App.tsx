import { useEffect, useReducer, useState } from "react";
import { Carrinho } from "./components/Carrinho";
import { Extrato } from "./components/Extrato";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { fetchProducts } from "./services/products";
import type { ApiStatus, Product } from "./types";
import { cartReducer} from "./hooks/cartReducer";
import { Modal } from "./components/Modal";
import { modalReducer } from "./hooks/modalReducer";

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  const [cartItems, dispatchCartItems] = useReducer(cartReducer, []);
  const [modalState, dispatchModalState] = useReducer(modalReducer, {
    isOpen: false,
    type: null
  })

  function handleOpenNewSell() {
    dispatchModalState({ type: "openModal", payload: "newSell" });
  }

  function handleOpenEndSell() {
    dispatchModalState({ type: "openModal", payload: "endSell"});
  }

  function handleOpenApplyDiscount() {
    dispatchModalState({ type: "openModal", payload: "applyDiscount"});
  }

  function handleOpenSeeHistory() {
    dispatchModalState({ type: "openModal", payload: "seeHistory"});
  }

  function handleConfirmModal() {
    if (modalState.type === "newSell") {
      dispatchCartItems({ type: "cartCleared" });
    }
    // Aqui você pode adicionar lógica para "FINALIZE_SELL" se precisar
    
    dispatchModalState({ type: "closeModal" });
  }

  function handleCloseModal() {
    dispatchModalState({ type: "closeModal" });
  }

  function retryProducts() {
    setApiStatus("checking");
    setProductsError(null);
    setLoadAttempt((attempt) => attempt + 1);
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
            dispatchCartItems({ type: "productAdded", product })
          }
          onQuantityChange={(productId, quantity) =>
            dispatchCartItems({ type: "quantityChanged", productId, quantity })
          }
          onRemoveProduct={(productId) =>
            dispatchCartItems({ type: "itemRemoved", productId })
          }
          onRetryProducts={retryProducts}
        />
        <Extrato itemCount={itemCount} subtotal={subtotal} />
      </main>
  
      <Footer 
        handleNewSell={handleOpenNewSell} 
        handleEndSell={handleOpenEndSell}
        handleApplyDiscount={handleOpenApplyDiscount}
        handleHistory={handleOpenSeeHistory}
      />

      <Modal 
        isOpen={modalState.isOpen}
        type={modalState.type}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />   
    </div>
  );
}

export default App;
