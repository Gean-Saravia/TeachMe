// Seleccionamos todos los elementos que se pueden arrastrar
const cajas = document.querySelectorAll(".class-item-misclases");

// Seleccionamos el contenedor donde queremos soltar los elementos
const contenedor = document.querySelector("#contenedor-clases");

// Añadimos los eventos de drag y drop a cada caja, cuando nuestro programa escuche que una caja está "disparando" un evento que significa que una caja esta siendo arrastrada(dragstart) automaticamente se le asigna una clase a ese elemento, en este caso dragging, esto para saber que elemento esta moviendo el usuario y que no genere confusiones
//El foreach itera sobre cada elemento en CAJAS(HTML)
//Caja es la variable que representa cada elemento individual en la lsita cajas
cajas.forEach(caja => {
    caja.addEventListener('dragstart', () => {
        caja.classList.add('dragging');
    });
    //Una vez el usuario termine de mover o arrastrar el elemento, mediante el metodo de escuchamiento dragend nos daremos cuenta y automaticamente se le quitará la clase dragging a ese elemento
    caja.addEventListener('dragend', () => {
        caja.classList.remove('dragging');
    });
});

// Este evento detecta cuando arrastramos un elemento sobre el contenedor
contenedor.addEventListener('dragover', e => {
    //Hace el prevent default para que el navegador no intervenga a nuestro codigo
    e.preventDefault();
    //Esta variable se crea para seleccionar al elemento que está siendo arrastrado, así luego lo agrega como un hijo al contenedor que hemos asignado en nuestra variable contenedor, lo ordena en la ultima posicion 
    const draggingElement = document.querySelector('.dragging');
    contenedor.appendChild(draggingElement);
});
