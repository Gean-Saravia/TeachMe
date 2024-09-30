import { d, BACK_URL } from "./variables.js"

const btnIniciarSesion = d.querySelector('.btn-index')
const dropdownSesion = d.querySelector('.profile-menu')
const dropdownButton = d.querySelector('.dropbtn')
const token = localStorage.getItem('token')

//console.log(token);
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

async function usuarioVisitante(){
    
    try{
        const response = await fetch(`${BACK_URL}/users/token`, {
            method: 'GET',
            headers: {
                'token': token
            }
        })
        console.log("response", response);
        
        if (!response.ok || !token) {
            // Acá es cuando no está logeado
            btnIniciarSesion.classList.add('display-block')
            btnIniciarSesion.classList.remove('display-none')

            dropdownSesion.classList.add('right-1000')
            dropdownButton.classList.add('right-1000')
            //alert('Su sesión expiró, por favor vuelva a logearse')
            throw new Error(`Error: ${response.status}`);
        } else{
            // Acá es cuando hay usuario logeado
            //console.log("usuario",usuario);
            btnIniciarSesion.classList.remove('display-block')
            btnIniciarSesion.classList.add('display-none')

            dropdownSesion.classList.remove('display-none')
        }
    } catch(error){
        console.error('Error al cargar datos del usuario en la barra de navegacion:', error);
        btnIniciarSesion.classList.add('display-block')
        dropdownSesion.classList.remove('display-none')
        dropdownButton.classList.remove('display-none')
    }
}

usuarioVisitante()