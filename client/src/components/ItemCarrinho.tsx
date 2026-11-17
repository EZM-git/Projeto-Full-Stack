import type { CartItem } from "../types";

interface ItemCarrinhoProps {
    item: CartItem;
    onQuantityChange: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function ItemCarrinho({ item, onQuantityChange, onRemove }: ItemCarrinhoProps) {
    const unitPrice = item.unitPrice === null ? "Não informado" : currencyFormatter.format(item.unitPrice);
    const total = item.unitPrice === null ? "Não informado" : currencyFormatter.format(item.unitPrice * item.quantity);

    return (
        <tr className="border-t text-sm sm:text-base">
            <th scope="row" className="p-3 text-left font-medium">
            {item.name}
            </th>
        <td className="whitespace-nowrap p-3 text-center">
            <button
                type="button"
                onClick={() =>
                    onQuantityChange(item.productId, Math.max(1, item.quantity - 1))
                }
                className="mx-2 rounded border px-3 py-1 hover:bg-slate-100"
                aria-label={`Diminuir quantidade de ${item.name}`}
                disabled={item.quantity <= 1}
            >-</button>

            <span aria-label={`Quantidade: ${item.quantity}`}>{item.quantity}</span>

            <button
                type="button"
                onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
                className="mx-2 rounded border px-3 py-1 hover:bg-slate-100"
                aria-label={`Aumentar quantidade de ${item.name}`}
            >+</button>
        </td>

        <td className="whitespace-nowrap p-3 text-right">{unitPrice}</td>
        <td className="whitespace-nowrap p-3 text-right">{total}</td>
        <td className="p-3 text-right">
        <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="text-red-700 underline hover:text-red-900"
            aria-label={`Remover ${item.name} do carrinho`}
        >Remover</button>
        </td>
        </tr>
    );
}
