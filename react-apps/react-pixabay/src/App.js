import React from 'react';
import './App.css';
import Buscador from './componentes/Buscador';

function App() {
  return (
    <div className="app container">
      <div className="app container">
        <div className="jumbotron">
          <p className ="lead text-center">Buscador de imagenes con la API de PixaBay</p>
          <Buscador/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
