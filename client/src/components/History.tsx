import api from "../services/api";

interface HistoryProps {
    isOpen: boolean;
    onClose: () => void;
}

export function History({ isOpen, onClose }: HistoryProps) {
    if(!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar dentro
                className="mx-4 w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6 text-center shadow-2xl"
            >
                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-rose-700"
                    >
                        Não
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600"
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

/*
import { useEffect, useRef } from 'react';

export function AtivarBotaoComTecla() {
  // Cria uma referência tipada para o elemento <button>
    const botaoRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        // Exemplo: ativa o botão ao pressionar 'Enter'
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita comportamentos indesejados
            botaoRef.current?.click(); // Simula o clique real no botão
        }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleAcao = () => {
        alert('O botão foi ativado!');
    };

    return (
        <div>
        <p>Pressione <strong>Enter</strong> no teclado para clicar no botão:</p>
        <button ref={botaoRef} onClick={handleAcao}>
            Confirmar Ação
        </button>
        </div>
    );
    }

*/