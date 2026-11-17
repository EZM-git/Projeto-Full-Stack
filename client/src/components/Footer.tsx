import { Button } from "./Button";

interface FooterProps {
    handleNewSell: () => void;
    handleEndSell: () => void;
    handleApplyDiscount: () => void;
    handleHistory: () => void
}

export function Footer({ handleNewSell, handleEndSell, handleApplyDiscount, handleHistory}: FooterProps) {
    return (
        <footer className="w-full bg-slate-900 border-b border-slate-800 text-white px-6 py-4 gap-4">
            <div className="mx-auto grid-cols-5">
                <div className="flex items-center space-x-6">
                    <Button onClick={handleNewSell} disabled={false} bgColor="bg-green-500 hover:bg-green-700">
                        [F1] Nova Venda
                    </Button>
                    <Button onClick={handleEndSell} disabled={false}  bgColor="bg-rose-500 hover:bg-rose-700">
                        [F2] Finalizar Venda
                    </Button>
                    <Button onClick={handleApplyDiscount} disabled={false}  bgColor="bg-blue-500 hover:bg-blue-700">
                        [F4] Aplicar Desconto
                    </Button>
                    <Button onClick={handleHistory} disabled={false}  bgColor="bg-slate-700 hover:bg-slate-900">
                        [F9] Histórico
                    </Button>
                </div>
            </div>
        </footer>
    )
}