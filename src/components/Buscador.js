import React, { useState } from 'react'

export const Buscador = ({listadoState, setListadoState}) => {

  const [busqueda, setBusquedaState] = useState('');
  const [noEncontrado, setNoEncontrado] = useState(false); 

  const buscarPelicula = (e) => {
    //crear estado y actualizarlo
    setBusquedaState(e.target.value);
    console.log(busqueda);

    //el listado completo de peliculas realizado por medio de listadoState
    //filtrar para buscar coincidencias
    let peliculas_encontradas = listadoState.filter( pelicula =>{
      return pelicula.titulo.toLowerCase().includes(busqueda.toLocaleLowerCase());
    });

    if(busqueda.length <=1 || peliculas_encontradas <=0 ){
      peliculas_encontradas = JSON.parse(localStorage.getItem("peliculas"));
      setNoEncontrado(true);
    }else{
      setNoEncontrado(false);
    }

    //console.log(peliculas_encontradas);

    //actualizar estado del listado principal con lo que he logrado filtrar
    setListadoState(peliculas_encontradas);
  }

  return (
        <div className="search">
            <h3 className="title">Buscador: {busqueda}</h3>
            {
              (noEncontrado == true && busqueda.length >1) && (
                <span className='noEncontrado'>No se ha encontrado</span>
              )
            }
            <form>
                <input type="text" id="search_field" name="busqueda"
                        autoComplete='off'
                        value={busqueda}
                        onChange={buscarPelicula}/>

                <button id="search">Buscar</button>
            </form>
        </div>
  )
}
