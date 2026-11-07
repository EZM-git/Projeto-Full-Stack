import { useState, useEffect } from 'react'
import api from './services/api.ts'
import { Header } from './components/Header';

function App() {
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await api.get('/produtos');
        setIsApiConnected(true);
      } catch (error) {
        setIsApiConnected(false);
        console.error('Erro de conexão com a API:', error);
      }
    }
    checkApiStatus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header isApiConnected={isApiConnected} />

      <main className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Painel Principal</h2>
        {isApiConnected ? (
          <p className="text-emerald-400">Tudo pronto! Conectado ao servidor.</p>
        ) : (
          <p className="text-rose-400">⚠️ Erro: Certifique-se de que o backend (`npx tsx index.ts`) está rodando na porta 3000.</p>
        )}
      </main>
    </div>
  );
}

export default App;
