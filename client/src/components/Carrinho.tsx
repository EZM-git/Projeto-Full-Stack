import { useMemo, useState } from "react";
import type { ApiStatus, CartItem, Product } from "../types";
import { ItemCarrinho } from "./ItemCarrinho";

interface CarrinhoProps {
    apiStatus: ApiStatus;
    products: Product[];
    productsError: string | null;
    cartItems: CartItem[];
    onAddProduct: (product: Product) => void;
    onQuantityChange: (productId: number, quantity: number) => void;
    onRemoveProduct: (productId: number) => void;
    onRetryProducts: () => void;
}

export function Carrinho({ apiStatus, products, productsError, cartItems, onAddProduct, onQuantityChange, onRemoveProduct, onRetryProducts } : CarrinhoProps) {
    const [search, setSearch] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");

    const matchingProducts = useMemo(() => {
        const query = submittedSearch.trim().toLocaleLowerCase("pt-BR");

        if (!query) {
            return [];
        }

        return products.filter(
            (product) =>
                product.name.toLocaleLowerCase("pt-BR").includes(query) ||
                String(product.id) === query,
        );
    }, [products, submittedSearch]);

    function handleAddProduct(product: Product) {
        onAddProduct(product);
        setSearch("");
        setSubmittedSearch("");
    }

    return (
        <section className="m-3 flex min-w-0 flex-col rounded-xl bg-slate-700 lg:col-span-3">
            <div className="m-3 rounded-xl bg-slate-900 p-4">
                <h2 className="mb-3 text-xl font-semibold">
                    Buscar / Adicionar Produto
                </h2>

                <form onSubmit={(e) => {
                        e.preventDefault();
                        setSubmittedSearch(search);
                }} className="flex gap-2">
                    <label htmlFor="searchProduct" className="sr-only">
                        Buscar produto por nome ou código
                    </label>
                    <input
                        id="searchProduct"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Digite o nome ou código do produto"
                        className="min-w-0 flex-1 rounded-md bg-slate-950 px-4 py-2 text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={apiStatus !== "connected"}
                    />
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-5 py-2 font-medium transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={apiStatus !== "connected" || !search.trim()}
                    >Buscar</button>
                </form>

                {apiStatus === "checking" && (
                    <p className="mt-3 text-sm text-slate-300" role="status">
                        Carregando produtos...
                    </p>
                )}
                {productsError && (
                    <div className="mt-3 flex flex-wrap items-center gap-3" role="alert">
                        <p className="text-sm text-rose-300">{productsError}</p>
                        <button
                            type="button"
                            onClick={onRetryProducts}
                            className="rounded border border-rose-300 px-3 py-1 text-sm text-rose-200 hover:bg-rose-950"
                        >
                            Tentar novamente
                        </button>
                    </div>
                )}
                {submittedSearch.trim() && (
                    <ul className="mt-3 space-y-2" aria-label="Resultados da busca">
                        {matchingProducts.length === 0 ? (
                            <li className="text-sm text-slate-300">
                                Nenhum produto encontrado.
                            </li>
                        ) : (
                            matchingProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex items-center justify-between gap-3 rounded-md bg-slate-800 p-3"
                                >
                                    <span>
                                        {product.name}{" "}
                                        <span className="text-sm text-slate-400">
                                            (código {product.id})
                                        </span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleAddProduct(product)}
                                        className="shrink-0 rounded bg-green-700 px-3 py-1 text-sm hover:bg-green-600"
                                        aria-label={`Adicionar ${product.name} ao carrinho`}
                                    >Adicionar</button>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>

            <div className="m-3 min-w-0 flex-1 overflow-x-auto rounded-xl bg-white text-black">
                <table className="w-full min-w-xl border-collapse">
                    <thead className="bg-gray-300 text-left text-sm uppercase">
                        <tr>
                            <th scope="col" className="p-3">Produto</th>
                            <th scope="col" className="p-3 text-center">Quantidade</th>
                            <th scope="col" className="p-3 text-right">Preço unitário</th>
                            <th scope="col" className="p-3 text-right">Total</th>
                            <th scope="col" className="p-3">
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-slate-500">
                                Nenhum produto no carrinho.
                                </td>
                            </tr>
                            ) : (
                            cartItems.map((item) => (
                                <ItemCarrinho
                                    key={item.productId}
                                    item={item}
                                    onQuantityChange={onQuantityChange}
                                    onRemove={onRemoveProduct}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
    }
