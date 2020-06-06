import React from 'react';
import './App.css';

import Routes from './routes'

// state = informações mantidas dentro do componente

function App() {
  // use state retorna um array [valor do estado, função para atualizar o valor do estado]

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
