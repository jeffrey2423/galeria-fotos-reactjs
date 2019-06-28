import React from 'react';
import Buscador from './componentes/Buscador';

function App() {

  datosBusqueda = (termino) =>{
    console.log(termino);
  };

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes usando la API de PixaBay</p>
        <Buscador
          //asi pasamos datos del componente padre al componente hijo, con props
          mensaje = "Buscador.."
        />
      </div>
      
    </div>
  );
}

export default App;
