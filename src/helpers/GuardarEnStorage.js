export const GuardarEnStorage = (clave, elemento) =>{
    //consiguir los elementos que ya tenemos en localStorage
    let elementos = JSON.parse(localStorage.getItem(clave));

    //comprobar si es un array
    if(Array.isArray(elementos)){
        elementos.push(elemento);
    }else{
        //crear un arreglo con el nuevo elemento
        elementos = [elemento];
    }

    //Guardar en el localStorage
    localStorage.setItem(clave, JSON.stringify(elementos));
    
    //Devolver objeto guardado
    return elemento;
}