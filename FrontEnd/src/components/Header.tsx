import React from "react";

interface HeaderProps {
  isApiConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isApiConnected }) => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">

          <h1 className="text-xl font-bold">RegionalExpress - Painel de Controle</h1>
          <div className="h-6 w-px bg-slate-800 hidden sm:block" />
          <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50">
            <span
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                isApiConnected ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
            <span className="text-xs font-medium text-slate-300">
              {isApiConnected ? "API Conectada (:3000)" : "API Desconectada"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
