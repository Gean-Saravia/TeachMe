import { d, BACK_URL } from "./variables.js"

const userNameNav = d.querySelector('#user-name-nav')
const userPictureNav = d.querySelector('#user-picture-nav')
const token = localStorage.getItem('token')
const botonCerrarSesion = d.querySelector('#cerrar-sesion')

function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

const dropdownButton = d.querySelector('#dropdownButton')
dropdownButton.addEventListener('click', toggleMenu)

async function usuarioNavbar(){
    
    try{
        const response = await fetch(`${BACK_URL}/users/token`, {
            method: 'GET',
            headers: {
                'token': token
            }
        })
        //console.log("response", response);
        
        if (!response.ok) {
            Swal.fire({
                icon: "warning",
                title: "Upss...",
                text: "Su sesión expiró. Por favor vuelva a logearse!",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Iniciar Sesión',
                footer: '<a href="../../index.html">Volver al inicio</a>'
            }).then((result) => {
                if (result.isConfirmed){
                    location.href = "./login.html"
                }
            })
            //alert('Su sesión expiró, por favor vuelva a logearse')
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const usuario = data.user[0]
        //console.log("usuario",usuario);

        userNameNav.innerText = `${usuario.nombre}`
        userPictureNav.src = usuario.foto_perfil ==  null ? "/assets/Icon-user.png" : `${usuario.foto_perfil}`
        userPictureNav.alt = `${usuario.nombre}`
    } catch(error){
        console.error('Error al cargar datos del usuario en la barra de navegacion:', error);
        
    }
}
botonCerrarSesion.addEventListener('click', () => {
    Swal.fire({
        icon: "warning",
        title: "Upss...",
        text: "Su sesión expiró. Por favor vuelva a logearse!",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Iniciar Sesión',
        footer: '<a href="../../index.html">Volver al inicio</a>'
    }).then((result) => {
        if (result.isConfirmed){
            location.href = "./login.html"
        }
    })
    Swal.fire({
        title: "¿Cerrar sesión?",
        showCancelButton: true,
        confirmButtonText: "Si, salir",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            localStorage.removeItem('token')
            location.href = "./login.html"
        }
    });
})

//botonCerrarSesion.addEventListener('click', () => cerrarSesion())

usuarioNavbar()