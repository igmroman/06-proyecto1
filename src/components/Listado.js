import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({listadoState, setListadoState}) => {

    
    const [editar, setEditar] = useState(0);

    useEffect(()=>{
        console.log("componente de listado de peliculas useEffect");
        conseguirPeliculas();
        //console.log("listadoState contiene" +pelis);
    },[]);

    const conseguirPeliculas = () =>{
        let peliculas = JSON.parse(localStorage.getItem("peliculas"));
        //console.log(peliculas);

        setListadoState(peliculas);

        return peliculas;
    }

    const BorrarPelicula = (id) =>{
        //Conseguir las peliculas almacenadas
        let peliculas_almacenadas = conseguirPeliculas();
        //Filtrar las peliculas para que elimine del array la que no quiero
        let nuevo_array_peliculas = peliculas_almacenadas.filter(pelicula => pelicula.id !== parseInt(id));
        //console.log(peliculas_almacenadas, nuevo_array_peliculas);
        //Actualizar el estado del listado
        setListadoState(nuevo_array_peliculas);
        console.log(nuevo_array_peliculas);

        //Actualizar los datos en el local storage
        localStorage.setItem('peliculas', JSON.stringify(nuevo_array_peliculas));
    }

    if(listadoState == 0){
        return (
            <div>
                <h2>No hay peliculas para mostrar</h2>
            </div>
        );
    }else{
        return(
            listadoState.map(pelicula =>{
                return(
                    <article key={pelicula.id} className="peli-item">
                        <h3 className="title">{pelicula.titulo}</h3>
                        <p className="description">{pelicula.descripcion}</p>

                        <button className="edit" onClick={ () => setEditar(pelicula.id)}>Editar</button>
                        <button className="delete" onClick={ () => BorrarPelicula(pelicula.id) }>Borrar</button>

                        {/**Aparece formulario de editar */}
                        {editar === pelicula.id && (
                            
                            <Editar pelicula={pelicula}
                                    conseguirPeliculas={conseguirPeliculas}
                                    setEditar={setEditar}
                                    setListadoState={setListadoState}
                            />

                        )}

                    </article>
                );
            })
            
        )
    }

    /*return (
    <>
        {   
            (listadoState != null) ?
                

            : 
        }
        

    </>
  )*/
}
