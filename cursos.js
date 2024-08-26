const d = document
const lorem_ipsum = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta expedita a voluptatibus laborum, tempore deserunt?"

const cursos = [
    {
        nombre: "Programación",
        descripcion: `${lorem_ipsum}`,
        imagen: "./assets/hombre-computadora-estudia.png"
    },
    {
        nombre: "Idiomas",
        descripcion: `${lorem_ipsum}`,
        imagen: "./assets/idiomas-cursos.png"
    },
    {
        nombre: "Geografía",
        descripcion: `${lorem_ipsum}`,
        imagen: "./assets/geografia-cursos.png"
    },
    {
        nombre: "Álgebra",
        descripcion: `${lorem_ipsum}`,
        imagen: "./assets/algebra-cursos.png"
    },
    {
        nombre: "Electrónica",
        descripcion: `${lorem_ipsum}`,
        imagen: "./assets/electronica-cursos.png"
    },
    {
        nombre: "Inteligencia Artificial",
        descripcion: `${lorem_ipsum}`,
        imagen: "./assets/ia-cursos.png"
    },
    {
        nombre: "Literatura",
        descripcion: `${lorem_ipsum}`,
        imagen: "./assets/literatura-cursos.png"
    },
    {
        nombre: "Guitarra",
        descripcion: `${lorem_ipsum}`,
        imagen: "./assets/guitarra-cursos.png"
    },
]

const botonVolver = d.querySelector('.volver-cursos')
const sectionCursos = d.querySelector('.main-cursos>section')
const searchBar = d.querySelector('#search-bar')
const styleParagraph = "font-size= 2.5rem; font-family= Alata"

function generarCursos(resultados){
    sectionCursos.innerHTML = '';
    if(resultados.length > 0){
        resultados.forEach(curso => {
            const card = d.createElement('article');
            card.className = 'article-cursos';
            card.innerHTML = `
                <div class="texto-article-cursos">
                    <h2>${curso.nombre}</h2>
                    <p>${curso.descripcion}</p>
                    <button><a href="./tarjetas-grandes.html">Ver profes</a></button>
                </div>
                <div class="imagen-article-cursos">
                    <img src="${curso.imagen}" alt="Curso de ${curso.nombre}">
                </div>
            `;
            sectionCursos.appendChild(card);
        })
    } else {
        sectionCursos.innerHTML = `<p class="busqueda-sin-exito">No se encontraron resultados, intente con otro término!</p>`
    }
}

botonVolver.addEventListener('click', ()=> {
    window.history.go(-1)
})

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const resultados = cursos.filter(curso => curso.nombre.toLowerCase().includes(query));

    generarCursos(resultados);
})

generarCursos(cursos)