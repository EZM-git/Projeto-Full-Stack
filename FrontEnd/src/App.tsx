import { useState, useEffect } from 'react'
import api from './services/api.ts'

function App() {
  const [produtos, setProdutos] = useState<IProdutos[]>([]);

  
  interface IProdutos {
      id: number;
      name: string;
      state: State;
  }

  enum State {
      MG = 'Minas Gerais',
      SP = 'São Paulo',
      RJ = 'Rio de Janeiro'
  }


  useEffect(() => {
    async function getProducts() {
      const response = await api.get<IProdutos[]>('/produtos');

      console.log(response.data);
      setProdutos(response.data);
    };
    getProducts();
  }, []);

  return (
    <div>
      { produtos.map( product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.state}</p>
        </div>
      )) 
      }
    </div>
  );
}

export default App;
