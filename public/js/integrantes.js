const integrantes = [
    {
        nombre: "Jazmin Ferreyra",
        rol: "Lider de Proyecto",
        github: "https://github.com/Jazm1nne",
        linkedin: "https://www.linkedin.com/in/jazmin-ferreyra/",
        email: "belenjazminferreyra@gmail.com",
        foto: "/assets/jazmin-emoji.png"
    },
    {
        nombre: "Fabrizio Catanzaro",
        rol: "Lider de Proyecto",
        github: "https://github.com/FabrizioCatanzaro",
        linkedin: "https://www.linkedin.com/in/luciano-fabrizio-catanzaro-pfahler/",
        email: "fabriziocatanzaro1@gmail.com",
        foto: "/assets/fabrizio-emoji.png"
    },
    {
        nombre: "Laura Fernández",
        rol: "Lider de Proyecto",
        github: "https://github.com/MelioraImpera",
        linkedin: "https://www.linkedin.com/in/fernandez-laura-belen/",
        email: "fernandezlaurabelen@gmail.com",
        foto: "/assets/laura-emoji.png"
    },
    {
        nombre: "Gean Saravia",
        rol: "Lider de Proyecto",
        github: "https://github.com/Gean-Saravia",
        linkedin: "https://www.linkedin.com/in/gean04/",
        email: "geansaravia2004@gmail.com",
        foto: "/assets/gean-emoji.png"
    },
    {
        nombre: "Camila Cardozo",
        rol: "Lider de Proyecto",
        github: "https://github.com/Camscript",
        linkedin: "https://www.linkedin.com/in/camila-cardozo-851a61253/",
        email: "camilaagustina2901@gmail.com",
        foto: "/assets/camila-emoji.png"
    },
    
]

const cont_equipo_index = document.querySelector('.cont-equipo-index');

function generarCards(){
        integrantes.forEach(integrante => {
            const card = document.createElement('div');
            card.className = 'equipo-index';
            card.style.backgroundImage = `url(${integrante.foto})`;
    
            card.innerHTML = `
            <p class="equipo-nombre">${integrante.nombre}</p>
                <p class="equipo-rol">${integrante.rol}</p>
                <div class="equipo-contacto">
                    <a href="${integrante.github}" target="_blank"><img src="/assets/github.svg" alt="GitHub"></a>
                    <a href="${integrante.linkedin}" target="_blank"><img src="/assets/linkedin.svg" alt="LinkedIn"></a>
                    <a href="mailto:${integrante.email}" target="_blank"><img src="/assets/email.svg" alt="Email"></a>
                </div>
            `;
    
            cont_equipo_index.appendChild(card);
        });
}

generarCards();