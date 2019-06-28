import React, {Component} from 'react';
import Buscador from './componentes/Buscador';

class App extends Component {

  state = {
    termino :""
  }

  consultarApi = () =>{
    const url ='https://pixabay.com/api/?key=11865265-50cb1a9338b6b50f08250dc6b&q=${}';
    console.log(url);
  }

  datosBusqueda = (termino) =>{
    this.setState({
      termino
    }, () =>{
      this.consultarApi();
    })
  }
  render(){
    return (
        <div className="app container">
          <div className="jumbotron">
            <p className ="lead text-center">Buscador de imagenes con la API de PixaBay</p>
            <Buscador
              datosBusqueda={this.datosBusqueda}
            />
          </div>
          {this.state.termino}
        </div>
    );
  }
}

export default App;
