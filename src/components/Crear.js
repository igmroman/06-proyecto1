import React, { useState } from 'react'
import { GuardarEnStorage } from '../helpers/GuardarEnStorage';

export const Crear = ({listadoState, setListadoState}) => {
    const tituloComponente = "Añadir pelicula";
    const [peliculaState, setPeliculaState] = useState({
        titulo: '',
        descripcion: ''
    });

    const [existe, setExisteState] = useState(false);
    //const [nueva, setNuevaState] = useState(false);

    const {titulo, descripcion} = peliculaState;

    const conseguirDatosForm = (e) =>{
        e.preventDefault();

        //conseguir datos del formulario
        let target = e.target;
        let titulo = target.titulo.value;
        let descripcion = target.descripcion.value;

        //crear objeto de la pelicula a guardar

        let pelicula = {
            id: new Date().getTime(),
            titulo,
            descripcion
        };

        //si la pelicula tiene el mismo nombre
        //mostrar por pantalla la pelicula ya se encuentra

        //console.log(listadoState);
        try{
            /*let peliculaObtenida = listadoState.find(pelicula => pelicula.titulo.toLowerCase() == titulo.toLowerCase());
            console.log(peliculaObtenida);
            console.log(pelicula.titulo.toLowerCase().includes(peliculaObtenida.titulo.toLowerCase()));
            */
            let peliculaObtenida = listadoState.filter( pelicula =>{
                return pelicula.titulo.toLowerCase().includes(titulo.toLowerCase());
            });
            //
            console.log(peliculaObtenida);
            //typeof peliculaObtenida != "undefined"
            if(peliculaObtenida.length >= 1){
                console.log("la pelicula ya se encuentra");
                setExisteState(true);
            }else if(peliculaObtenida.length === 0){
                console.log("es una nueva pelicula");
                setExisteState(false);
                //guardar estado
                setPeliculaState(pelicula);

                //actualizar el estado del listado principal
                setListadoState(elementos =>{
                    return[...elementos,pelicula];
                })

                //Guardar en el almacenamiento local
                GuardarEnStorage("peliculas",pelicula);
                
                //console.log(peliculaState);
                //alert(titulo +"-"+ descripcion);
            }
        }
        catch(error){
            console.log("atrapamos el error"+error);
        }

        

    }

    

  return (
    <div className="add">
        <h3 className="title">{tituloComponente}</h3>

        <strong>
            {(titulo && descripcion && (existe!=true)) && "Has creado la pelicula: "+titulo}
            {existe==true && "La pelicula ya existe "+titulo}
        </strong>

        <form onSubmit={conseguirDatosForm}>
            <input type="text" id="titulo" name="titulo" placeholder="Titulo" />
            <textarea id="descripcion" name="descripcion" placeholder="Descripción"></textarea>
            <input type="submit" id="save" value="Guardar" />
        </form>
    </div>
  )
}
