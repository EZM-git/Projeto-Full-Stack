interface ExtratoProps {
    itemCount: number;
    subtotal: number | null;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function Extrato({ itemCount, subtotal }: ExtratoProps) {
    return (
        <aside className="m-3 rounded-xl bg-blue-200 p-5 text-slate-950 lg:col-span-1">
            <h2 className="text-xl font-semibold">Resumo da venda</h2>
            <dl className="mt-6 space-y-4">
                <div className="flex justify-between gap-3">
                <dt>Itens</dt>
                <dd>{itemCount}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-blue-300 pt-4 font-semibold">
                <dt>Subtotal</dt>
                <dd>
                    {subtotal === null ? "Preço não informado" : currencyFormatter.format(subtotal)}
                </dd>
            </div>
            </dl>
            {subtotal === null && itemCount > 0 && (
                <p className="mt-4 text-sm text-slate-700">
                A API ainda não fornece o preço dos produtos. O total será calculado
                quando esse dado estiver disponível.
                </p>
            )}
        </aside>
    );
}
