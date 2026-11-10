import React from "react";

export const Carrinho: React.FC = () => {
    const [search, setSearch] = React.useState("")

    return (
        <div className="bg-slate-700 col-span-3 m-3 rounded-xl grid grid-rows-6">
            <div className="bg-slate-900 row-span-1 m-3 rounded-xl">
                <label htmlFor="searchProduct" className="text-2xl ml-5 font-semibold">
                    Buscar / Adicionar Produto
                </label>
                <div className="relative w-96 ">
                    <input 
                    id="searchProduct"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Bipando código ou digite o nome..."
                    className="w-333 m-2 bg-slate-950 rounded-md px-2 py-2  text-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder-slate-500"
                    autoFocus
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-1 cursor-pointer">
                        <button></button>
                    </div>
                </div>
                
            </div>
            <div className="bg-white row-span-5 m-3 rounded-xl">

            </div>
        </div>
    )
}