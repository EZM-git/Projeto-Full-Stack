import React from "react";
import { Button } from "./Button";

function newSell() {

}

function endSell() {

}

function applyDiscount() {

}

function cancelSell() {

}

function history() {

}

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-slate-900 border-b border-slate-800 text-white px-6 py-4 gap-4">
            <div className="mx-auto grid-cols-5">
                <div className="flex items-center space-x-6">
                    <Button onClick={newSell} disabled={false} bgColor="bg-slate-700">
                        [F1] Nova Venda
                    </Button>
                    <Button onClick={endSell} disabled={false}  bgColor="bg-green-500">
                        [F2] Finalizar Venda
                    </Button>
                    <Button onClick={applyDiscount} disabled={false}  bgColor="bg-blue-500">
                        [F4] Aplicar Desconto
                    </Button>
                    <Button onClick={cancelSell} disabled={false}  bgColor="bg-red-500">
                        [F9] Cancelar Item
                    </Button>
                    <Button onClick={history} disabled={false}  bgColor="bg-slate-700">
                        [F10] Histórico
                    </Button>
                </div>
            </div>
        </footer>
    )
}