import React from "react";
import { ItemCarrinho } from "./ItemCarrinho";

export const Carrinho: React.FC = () => {
    const [search, setSearch] = React.useState("")

    return (
        <div className="bg-slate-700 col-span-3 m-3 rounded-xl grid grid-rows-6">
            <div className="bg-slate-900 row-span-1 m-3 rounded-xl">
                <label htmlFor="searchProduct" className="text-2xl ml-5 font-semibold">
                    Buscar / Adicionar Produto
                </label>
                <div className="flex items-center gap-2 w-full">
                    <input 
                    id="searchProduct"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Bipando código ou digite o nome... (Ctrl + B)"
                    className="w-310 m-2 bg-slate-950 rounded-md px-4 py-2 pr-10 text-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder-slate-500"
                    autoFocus
                    />
                    <button 
                        type="button"
                        onClick={() => console.log("a")}
                        className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-md font-medium transition-colors flex items-center justify-center text-lg"
                    >
                        🔍
                    </button>
                </div>
            </div>
            <div className="bg-white row-span-5 m-3 rounded-xl">
                <div className="grid grid-cols-5 text-black bg-gray-300 text-3xl font-semibold">
                    <span className="cols-span-1 justify-self-center self-center">
                        Produto
                    </span>
                    <span className="cols-span-1 justify-self-center self-center">
                        QTD
                    </span>
                    <span className="cols-span-1 justify-self-center self-center">
                        P. QTD
                    </span>
                    <span className="cols-span-1 justify-self-center self-center">
                        DESC.
                    </span>
                    <span className="cols-span-1 justify-self-center self-center">
                        TOTAL
                    </span>
                </div>

                <ItemCarrinho productName="water" amount={1} priceByAmount={2.3} description=""/>
            </div>
        </div>
    )
}