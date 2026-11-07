import React from 'react';

interface HeaderProps {
    isApiConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isApiConnected }) => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Lado Esquerdo: Logo e Nome do Sistema */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            {/* Ícone de Logística/Caminhão (SVG Inline) */}
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" 
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
              Regional<span className="text-blue-500">Express</span>
            </h1>
            <p className="text-xs text-slate-400">Gestão Logística Interestadual (MG • SP • RJ)</p>
          </div>
        </div>

        {/* Centro/Direita: Status da API e Perfil */}
        <div className="flex items-center space-x-6">
          
          {/* Badge de Status da API Backend */}
          <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50">
            <span 
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                isApiConnected ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <span className="text-xs font-medium text-slate-300">
              {isApiConnected ? 'API Conectada (:3000)' : 'API Desconectada'}
            </span>
          </div>

          {/* Divisória Vertical */}
          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          {/* Usuário Operador */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-semibold text-blue-400">
              OP
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium leading-none">Operador Logístico</p>
              <p className="text-xs text-slate-400 mt-1">Malha Sudeste</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};