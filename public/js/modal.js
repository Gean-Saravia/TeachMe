import { d, BACK_URL } from "./variables.js"
const token = localStorage.getItem('token')

function openModal() {
    document.getElementById('modalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden'; 
    document.getElementById('pageOverlay').style.display = 'block'; // Mostrar el overlay
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.body.style.overflow = 'auto'; 
    document.getElementById('pageOverlay').style.display = 'none'; // Ocultar el overlay
}
function selectOption(button, group) {
    const buttons = button.parentElement.getElementsByClassName('option-button');
    Array.from(buttons).forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function selectPaymentMethod(method) {
    const options = document.getElementsByClassName('payment-option');
    Array.from(options).forEach(option => option.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    const cardDetails = document.getElementById('cardDetails');
    const cashDetails = document.getElementById('cashDetails');

    if (method === 'card') {
        cardDetails.style.display = 'grid';
        cardDetails.classList.add('grid-layout'); 
        cashDetails.style.display = 'none';
    } else if (method === 'cash') {
        cardDetails.style.display = 'none';
        cardDetails.classList.remove('grid-layout'); 
        cashDetails.style.display = 'block';
    }
}
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});


document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Aquí irían las validaciones y el procesamiento del pago
});

document.getElementById('closeModalBtn').addEventListener('click', closeModal);

// Script para manejar el dropdown
document.querySelector('.btn-dropdown').addEventListener('click', function() {
    document.querySelector('.dropdown-menu').classList.toggle('show');
});

// Cerrar el dropdown cuando se selecciona una opción
document.querySelectorAll('.dropdown-menu li a').forEach(function(item) {
    item.addEventListener('click', function() {
        document.querySelector('.btn-dropdown').textContent = this.textContent;
        document.querySelector('.dropdown-menu').classList.remove('show');
    });
});

// Cerrar el dropdown si se hace clic fuera
window.addEventListener('click', function(e) {
    if (!e.target.matches('.btn-dropdown')) {
        var dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(function(dropdown) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
});

const urlParams = new URLSearchParams(window.location.search);
console.log("params:",urlParams);

const claseId = urlParams.get('clase');
console.log("claseId:",claseId);

const profesorContainer = d.querySelector('.profesor-card')
const precioButton = d.querySelector('#precio')
const asignaturaButton = d.querySelector('#asignatura')

let data = []

async function generarClase(){
    try{
        const response = await fetch(`${BACK_URL}/classes?id_clase=${claseId}`, {
            method: 'GET',
        })
        console.log("response de PROF CONTRATAR:",response);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        data = await response.json();
        console.log("DATA DE PROF CONTRATAR:",data);

        profesorContainer.innerHTML = '';
        if(data.length > 0){
            data.forEach(clase => {
                
                const profFoto = d.createElement('div');
                profFoto.className = 'profesor-foto-container';
                profFoto.innerHTML = `
                <img src="${clase.foto_profe}" alt="${clase.profesor}">
                <div class="calificacion">
                    <div class="estrellas">★★★★☆</div>
                    <p>4.5 / 5</p>
                    <p>(125 estudiantes)</p>
                </div>
                `;
                
                const profInfo = d.createElement('div');
                profInfo.className = 'profesor-info'
                profInfo.innerHTML = `
                <h2>${clase.profesor} ${clase.profe_apellido}</h2>
                <div class="conocimientos">
                    <span class="conocimiento">${clase.materia}</span>
                    <span class="conocimiento">${clase.titulo}</span>
                </div>
                <p class="descripcion">${clase.descripcion}</p>
                <p class="precio">Precio por hora: ${clase.precio_hora} ARS</p>
                <button href="#" id="openModalBtn" class="btn_contratar">Contratar Ahora</button>
                `;
                profesorContainer.appendChild(profFoto);
                profesorContainer.appendChild(profInfo);
                
                profInfo.querySelector('#openModalBtn').addEventListener('click', () => openModal());
                precioButton.innerHTML = `${clase.precio_hora}`
                asignaturaButton.value = `${clase.titulo}`
            })
        } else {
            profesorContainer.innerHTML = `<p class="busqueda-sin-exito">No se encontró ninguna clase con ese ID</p>`
        }
        
    } catch(error){
        console.error('Hubo un problema con la petición:', error);
    }
}

const mpButton = d.querySelector('#wallet_container')
const totalButton = document.querySelector('.total .option-button'); 

async function comprarClase(){
    try{
        // fetch para traer datos del usuario
        const responseToken = await fetch(`${BACK_URL}/users/token`, {
            method: 'GET',
            headers: {
                'token': token
            }
        })
        //console.log("response de token", response);
        
        if (!responseToken.ok) {
            //alert('Su sesión expiró, por favor vuelva a logearse')
            throw new Error(`Error: ${responseToken.status}`);
        }
        let data = await responseToken.json();
        const usuario = data.user[0]
        const idUsuario = usuario.id


        // Fetch para traer datos de la clase
        const responseDatos = await fetch(`${BACK_URL}/classes?id_clase=${claseId}`, {
            method: 'GET',
        })
        //console.log("response de PROF CONTRATAR:",responseDatos);
        
        if (!responseDatos.ok) {
            throw new Error(`Error: ${responseDatos.status}`);
        }
        let dataUsuario = await responseDatos.json();
        const id_profesor = dataUsuario[0].profe_id;
        console.log("dataUsuario:", dataUsuario);
        console.log("idProfesor:", id_profesor);
        

        const response = await fetch(`${BACK_URL}/hirings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    "id_clase": claseId,
                    "id_profesor": id_profesor,
                    "id_alumno": idUsuario,
                    "total": totalButton.textContent.replace(/[^\d]/g, '')
            })
        })
        //console.log("response de PROF CONTRATAR:",response);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        let dataContratacion = await response.json();
        console.log("DATA DE LA COMPRA:",dataContratacion);
        
    } catch(error){
        console.error('Hubo un problema con la petición:', error);
        //console.log("total::::::", totalButton.textContent.replace(/[^\d]/g, ''));
    }
}

mpButton.addEventListener('click', () => {
    comprarClase()
})

generarClase()