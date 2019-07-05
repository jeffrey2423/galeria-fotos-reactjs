import React, {Component} from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
//import Imagen from './componentes/Imagen';
class App extends Component {

  state = {
    termino :"",
    imagenes :[],
    pagina: ""
  }

  scroll = () =>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smoot', 'start');
  }

  paginaAnterior = () =>{
    //leer state pagina actual
    let pagina = this.state.pagina;

    //validar si la pagina es uno
    if(pagina === 1) return null;

    //restar uno a la pagina actual
    pagina--;

    // agregar cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    console.log(pagina);
  }
  paginaSiguiente = () =>{
    //leer state pagina actual
    let pagina = this.state.pagina;

    //sumar uno a la pagina actual
    pagina++;

    // agregar cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    console.log(pagina);
  }

  consultarApi = () =>{
    const pagina = this.state.pagina;
    const url =`https://pixabay.com/api/?key=11865265-50cb1a9338b6b50f08250dc6b&q=${this.state.termino}&per_page=30&&page=${pagina}`;
    
    //console.log(url);
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => this.setState({imagenes: resultado.hits}))
  }

  datosBusqueda = (termino) =>{
    this.setState({
      termino: termino,
      pagina: 1
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
          <div className="row justify-content-center">
            <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
            />
          </div>
        </div>
    );
  }
}

export default App;
