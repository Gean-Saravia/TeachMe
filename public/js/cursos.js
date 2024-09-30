import { d, BACK_URL } from "./variables.js"
const lorem_ipsum = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta expedita a voluptatibus laborum, tempore deserunt?"
/*
const cursos = [
    {
        nombre: "Programación",
        descripcion: `${lorem_ipsum}`,
        imagen: "/assets/hombre-computadora-estudia.png"
    },
    {
        nombre: "Idiomas",
        descripcion: `${lorem_ipsum}`,
        imagen: "/assets/idiomas-cursos.png"
    },
    {
        nombre: "Geografía",
        descripcion: `${lorem_ipsum}`,
        imagen: "/assets/geografia-cursos.png"
    },
    {
        nombre: "Álgebra",
        descripcion: `${lorem_ipsum}`,
        imagen: "/assets/algebra-cursos.png"
    },
    {
        nombre: "Electrónica",
        descripcion: `${lorem_ipsum}`,
        imagen: "/assets/electronica-cursos.png"
    },
    {
        nombre: "Inteligencia Artificial",
        descripcion: `${lorem_ipsum}`,
        imagen: "/assets/ia-cursos.png"
    },
    {
        nombre: "Literatura",
        descripcion: `${lorem_ipsum}`,
        imagen: "/assets/literatura-cursos.png"
    },
    {
        nombre: "Guitarra",
        descripcion: `${lorem_ipsum}`,
        imagen: "/assets/guitarra-cursos.png"
    },
]
*/
const botonVolver = d.querySelector('.volver-cursos')
const sectionCursos = d.querySelector('.main-cursos>section')
const searchBar = d.querySelector('#search-bar')
const styleParagraph = "font-size= 2.5rem; font-family= Alata"

const menu = document.getElementById('subMenu');
const button = document.getElementById('dropdownButton');
button.addEventListener('click', (e) =>{
    menu.classList.toggle('show');
    button.classList.toggle('active');
})

function highlightItem(selectedItem) {
    // Elimina la clase 'selected' de todos los ítems
    var items = document.querySelectorAll('#class-list .item');
    items.forEach(function (item) {
        item.classList.remove('selected');
    });

    // Añade la clase 'selected' al ítem que se ha hecho clic
    selectedItem.classList.add('selected');
}

let data = []

async function generarCursos(busqueda){
    let filtrado = ''
    if(!busqueda){
        filtrado = ''
    } else{
        filtrado = busqueda
    }
    try{
        const response = await fetch(`${BACK_URL}/courses?nombre_materia=${filtrado}`, {
            method: 'GET',
        })
        // console.log(response);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        data = await response.json();
        //console.log(data);
        
        sectionCursos.innerHTML = '';
        if(data.length > 0){
            data.forEach(curso => {
                
                const card = d.createElement('article');
                card.className = 'article-cursos';
                card.innerHTML = `
                <div class="texto-article-cursos">
                <h2>${curso.nombre_materia}</h2>
                <p>${curso.descripcion}</p>
                <button data-curso-id=${curso.id}>Ver profes</button>
                </div>
                <div class="imagen-article-cursos">
                <img src="${curso.imagen_cargada}" alt="Curso de ${curso.nombre_materia}">
                </div>
                `;
                sectionCursos.appendChild(card);

                card.querySelector('button').addEventListener('click', (event) => {
                    const cursoId = event.target.dataset.cursoId;
                    window.location.href = `tarjetas-grandes.html?curso=${cursoId}`;
                });
            })
        } else {
            sectionCursos.innerHTML = `<p class="busqueda-sin-exito">No se encontraron resultados, intente con otro término!</p>`
        }
        
    } catch(error){
        console.error('Hubo un problema con la petición:', error);
    }
}

botonVolver.addEventListener('click', ()=> {
    window.history.go(-1)
})

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    //const resultados = data.filter(curso => curso.nombre_materia.toLowerCase().includes(query));
    console.log("query: ",query);
    generarCursos(query);

})

generarCursos()
