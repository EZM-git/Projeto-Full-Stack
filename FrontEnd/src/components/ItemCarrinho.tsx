import React from "react";

interface CarrinhoProps{
    productName: string,
    amount: number, 
    priceByAmount: number,
    description: string
}

export const ItemCarrinho: React.FC<CarrinhoProps> = ({ productName, amount, priceByAmount, description="" }) => {
    const [qtdAmount, setQtdAmount] = React.useState(amount)

    return (
        <div className="grid grid-cols-5 text-black text-2xl border">
            <span className="cols-span-1 justify-self-center self-center">
                {productName}
            </span>
            <span className="cols-span-1 justify-self-center self-center">
                <button onClick={()=>setQtdAmount(qtdAmount <= 1 ? 1 : qtdAmount - 1)} type="button" className="px-3 m-3 border rounded-xl">-</button>
                {qtdAmount}
                <button onClick={()=>setQtdAmount(qtdAmount + 1)} type="button" className="px-3 m-3 border rounded-xl">+</button>
            </span>
            <span className="cols-span-1 justify-self-center self-center">
                R$ {(priceByAmount).toFixed(2)}
            </span>
            <span className="cols-span-1 justify-self-center self-center">
                {description}
            </span>
            <span className="cols-span-1 justify-self-center self-center">
                R$ {(priceByAmount*qtdAmount).toFixed(2)}
            </span>
        </div>
    );
}