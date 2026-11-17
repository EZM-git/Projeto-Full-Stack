import type { ModalType } from "../hooks/modalReducer";

interface ModalProps {
    isOpen: boolean;
    type: ModalType;
    onClose: () => void;
    onConfirm: () => void;
}

export function Modal({ isOpen, type, onClose, onConfirm}: ModalProps) {
    if(!isOpen) return null;

    const contentConfig = {
        newSell: {
            title: "Iniciar nova venda?",
            description: "Todos os itens atuais do carrinho serão removidos.",
            confirmText: "Sim",
            cancelText: "Não"
        },
        endSell: {
            title: "Finalizar venda?",
            description: "Deseja registrar e encerrar esta venda?",
            confirmText: "Sim",
            cancelText: "Não"
        },
        applyDiscount: {
            title: "Aplicar desconto?",
            description: "Deseja aplicar desconto sobre o valor total?",
            confirmText: "Sim",
            cancelText: "Não"
        },
        seeHistory: {
            title: "Ver histórico de vendas?",
            description: "Deseja ver o histórico de vendas da loja?",
            confirmText: "Sim",
            cancelText: "Não"
        }
    };

    const current = type ? contentConfig[type] : null;

    if(!current) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar dentro
                className="mx-4 w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6 text-center shadow-2xl"
            >
                <h2 className="mb-2 text-lg font-bold text-white">{current.title}</h2>
                <p className="mb-6 text-sm text-slate-400">{current.description}</p>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-rose-700"
                    >
                        {current.cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600"
                    >
                        {current.confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}