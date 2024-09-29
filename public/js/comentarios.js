const comentarios = [
    {
        nombre: "Ana García",
        foto: "/assets/imagen-por-defecto.jpg",
        estrellas: 5,
        texto: "El profesor Carlos es excelente. Sus explicaciones son claras y siempre está dispuesto a resolver dudas. Gracias a sus clases, pude mejorar significativamente mi comprensión de las matemáticas avanzadas.",
        clase: "Cálculo Multivariable"
    },
    {
        nombre: "Juan Pérez",
        foto: "/assets/imagen-por-defecto.jpg",
        estrellas: 4,
        texto: "Las clases de estadística con el profesor Carlos son muy prácticas. Aprecio mucho cómo relaciona los conceptos teóricos con aplicaciones del mundo real. Recomiendo sus clases a cualquiera que quiera profundizar en esta área.",
        clase: "Estadística Aplicada"
    },
    {
        nombre: "María López",
        foto: "/assets/imagen-por-defecto.jpg",
        estrellas: 5,
        texto: "Increíble experiencia de aprendizaje. El profesor Carlos tiene una habilidad única para explicar conceptos complejos de machine learning de manera sencilla. Sus clases me han ayudado enormemente en mi proyecto de tesis.",
        clase: "Introducción al Machine Learning"
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
                <div class="comentario-estrellas">${'★'.repeat(comentario.estrellas)}${'☆'.repeat(5 - comentario.estrellas)}</div>
                <p class="comentario-texto">${comentario.texto}</p>
                <p class="comentario-clase">Clase tomada: ${comentario.clase}</p>
            </div>
        `;
        
        container.appendChild(comentarioElement);
    });
}

document.addEventListener('DOMContentLoaded', generarComentarios);

