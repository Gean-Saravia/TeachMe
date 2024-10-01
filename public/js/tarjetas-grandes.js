import { d, BACK_URL } from "./variables.js"

//Función del navbar
function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

function highlightItem(selectedItem) {
    // Elimina la clase 'selected' de todos los ítems
    var items = document.querySelectorAll('#class-list .item');
    items.forEach(function (item) {
        item.classList.remove('selected');
    });

    // Añade la clase 'selected' al ítem que se ha hecho clic
    selectedItem.classList.add('selected');
}

// Marca "Python" como seleccionado por defecto al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    var pythonItem = document.getElementById('python-item');
    if (pythonItem) {
        highlightItem(pythonItem);
    }
});

// Función para filtrar tarjetas según el texto del buscador
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-bar');
    const cards = document.querySelectorAll('.card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const cardContent = card.textContent.toLowerCase();
            if (cardContent.includes(searchTerm)) {
                card.style.display = ''; // Mostrar la tarjeta
            } else {
                card.style.display = 'none'; // Ocultar la tarjeta
            }
        });
    });
});

const urlParams = new URLSearchParams(window.location.search);
console.log("params:",urlParams);

const cursoId = urlParams.get('curso');
console.log("cursoId:",cursoId);

const sectionClases = d.querySelector('.cards-conteiner')
const searchBar = d.querySelector('#search-bar')

let data = []

async function generarProfes(busqueda){
    let filtrado = ''
    if(!busqueda){
        filtrado = ''
    } else{
        filtrado = busqueda
    }
    try{
        const response = await fetch(`${BACK_URL}/classes?id_materia=${cursoId}&titulo=${filtrado}`, {
            method: 'GET',
        })
        console.log("response de TARJ GRANDES:",response);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        data = await response.json();
        console.log("DATA DE TARJ GRANDES:",data);

        sectionClases.innerHTML = '';
        if(data.length > 0){
            data.forEach(clase => {
                
                const card = d.createElement('article');
                card.className = 'card';
                card.innerHTML = `
                <div class="image-card">
                    <img src="${clase.foto_profe}" alt="${clase.profesor}">
                </div>
                <div class="card-content">
                    <h3>${clase.profesor}</h3>
                    <button class="btn-py">${clase.titulo}</button>
                    <div class="rating">★★★★★</div>
                    <button data-clase-id=${clase.id} class="btn-c">Contratar</button>
                </div>
                `;
                sectionClases.appendChild(card);

                card.querySelector('.btn-c').addEventListener('click', (event) => {
                    console.log(event);
                    
                    const claseId = event.target.dataset.claseId;
                    window.location.href = `prof-contratar.html?clase=${claseId}`;
                });
            })
        } else {
            sectionClases.innerHTML = `<p class="busqueda-sin-exito">No se encontraron resultados, intente con otro término!</p>`
        }
        
    } catch(error){
        console.error('Hubo un problema con la petición:', error);
    }
}

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    //const resultados = data.filter(curso => curso.nombre_materia.toLowerCase().includes(query));
    console.log("query: ",query);
    generarProfes(query);

})

// Ejecutar las funciones cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    generarProfes();
    //setupSearchFilter();
});

