//Función del navbar
function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

const comentarios = [
    {
        nombre: "Ana García",
        estrellas: 5,
        foto: "/assets/imagen-por-defecto.jpg",
        texto: "El profesor Carlos es excelente. Sus explicaciones son claras y siempre está dispuesto a resolver dudas. Gracias a sus clases, pude mejorar significativamente mi comprensión de las matemáticas avanzadas.",

    }
];

function generarComentarios() {
    const container = document.querySelector('.comentarios-container');
    
    comentarios.forEach(comentario => {
        const comentarioElement = document.createElement('div');
        comentarioElement.className = 'comentario';
        comentarioElement.innerHTML = `
            <img src="${comentario.foto}" alt="Foto de ${comentario.nombre}" class="comentario-foto" width="60" height="60">
            <div class="comentario-contenido">
                <div class="comentario-nombre">${comentario.nombre}</div>
                <p class="comentario-texto">${comentario.texto}</p>
            </div>
        `;
        
        container.appendChild(comentarioElement);
    });
}

document.addEventListener('DOMContentLoaded', generarComentarios);
