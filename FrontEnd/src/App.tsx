import { useState, useEffect } from 'react'
import api from './services/api.ts'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Carrinho } from './components/Carrinho';
import { Extrato } from './components/Extrato';

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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header isApiConnected={isApiConnected} />
      <main className="flex-1 grid grid-cols-4 gap-3">
        <Carrinho />
        <Extrato />
      </main>
      <Footer />
    </div>
  );
}

export default App;
