import React from 'react'

export const Editar = ({pelicula, conseguirPeliculas, setEditar, setListadoState}) => {

    const titulo_componente = "Editar pelicula";

    const guardarEdicion = (e,id) =>{
      e.preventDefault();
      //alert(id);
      //conseguir el target del evento
      let target = e.target;

      console.log(target);
      //buscar el indice de la pelicula a actualizar
      const peliculas_almacenadas = conseguirPeliculas();
      const indice = peliculas_almacenadas.findIndex(pelicula => pelicula.id === id);
      
      //crear objeto con ese id de ese indice, con titulo y descripción del formulario
      let pelicula_actualizada = {
        id,
        titulo: target.titulo.value,
        descripcion: target.descripcion.value
      };

      console.log(indice,pelicula_actualizada);
      //Actualizar el elemento con ese indice
      peliculas_almacenadas[indice] = pelicula_actualizada;
      //guardar el nuevo array de objetos en el localStorage
      localStorage.setItem("peliculas",JSON.stringify(peliculas_almacenadas));
      //actualizar estado listadoState y editar
      setListadoState(peliculas_almacenadas);
      setEditar(0);
    }

  return (
    <div className='edit_form'>
        <h3 className="title">{titulo_componente}</h3>
        <form onSubmit={e => guardarEdicion(e, pelicula.id)}>
            <input type="text" name="titulo" className="titulo_editado"
                   defaultValue={pelicula.titulo} />
            
            <textarea name="descripcion" defaultValue={pelicula.descripcion}
                      className="descripcion editada"/>
            
            <input type="submit" className="editar" value="Actualizar" />

        </form>
    </div>
  )
}
