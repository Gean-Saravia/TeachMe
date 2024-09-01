const testimonios = [
    {
        nombre: 'Paulo Londra',
        curso: 'idiomas',
        resenia: 'Realizar este curso me permitió mejorar mi comunicación y comprensión',
        foto: '/assets/cabra-icon.png'
    },
    {
        nombre: 'Frank Fabra',
        curso: 'idiomas',
        resenia: 'Realizar este curso me permitió mejorar mi comunicación y comprensión',
        foto: '/assets/vaca-icon.png'
    },
    {
        nombre: 'Mauro Lombardo',
        curso: 'idiomas',
        resenia: 'Realizar este curso me permitió mejorar mi comunicación y comprensión',
        foto: '/assets/pato-icon.png'
    },
    {
        nombre: 'Migue Granados',
        curso: 'idiomas',
        resenia: 'Realizar este curso me permitió mejorar mi comunicación y comprensión',
        foto: '/assets/pez-icon.png'
    },
    {
        nombre: 'Floricienta',
        curso: 'idiomas',
        resenia: 'Realizar este curso me permitió mejorar mi comunicación y comprensión',
        foto: '/assets/vaca-icon.png'
    },
    {
        nombre: 'Equi Fernandez',
        curso: 'idiomas',
        resenia: 'Realizar este curso me permitió mejorar mi comunicación y comprensión',
        foto: '/assets/pato-icon.png'
    }
]

const cont_carrusel = document.querySelector('.carrusel-tracker')
const totalTestimonios = testimonios.length;
let currentIndex = 0;
const testimoniosVisibles = 4;

function generarTestimonios(){
    testimonios.forEach(testi => {
        const card = document.createElement('div');
        card.className = 'testimonio';
        card.innerHTML = `
                <img src="${testi.foto}" alt="${testi.nombre} imagen de perfil">
                <div class="testi-estrellas">
                    <p>&#9733;</p>
                    <p>&#9733;</p>
                    <p>&#9733;</p>
                    <p>&#9733;</p>
                    <p>&#9733;</p>
                </div>
                <div class="testi-detalles">
                    <p class="testi-nombre">${testi.nombre}</p>
                    <p class="testi-curso">Curso de ${testi.curso}</p>
                    <p class="testi-resena">${testi.resenia}</p>
                </div>
            </div>
        
        `;
        cont_carrusel.appendChild(card)
    })
}

cont_carrusel.addEventListener('mouseover', () => {
    cont_carrusel.style.animationPlayState = 'paused';
});

cont_carrusel.addEventListener('mouseout', () => {
    cont_carrusel.style.animationPlayState = 'running';
});

generarTestimonios()