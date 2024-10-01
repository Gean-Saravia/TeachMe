// Agregar y quitar idiomas
const token = localStorage.getItem('token')
import { d, BACK_URL } from "./variables.js"
const userSince = d.querySelector("#user-since")
const userNamePerfil = d.querySelector('#user-name-perfil')
const nameForm = d.querySelector('#name');
const surnameForm = d.querySelector('#surname');
//const dniForm = d.querySelector('#dni');
const genderForm = d.querySelector('#gender');
const birthdateForm = d.querySelector('#birthdate');
const emailForm = d.querySelector('#email');
const passwordForm = d.querySelector('#password');
const nationalityForm = d.querySelector('#nationality');
const phoneForm = d.querySelector('#phone');
const languageForm = d.querySelector('#language');
const level_LanguageForm = d.querySelector('#level-language');
const linkedinForm = d.querySelector('#linkedin');
const githubForm = d.querySelector('#github');
const socialForm = d.querySelector('#social');
const imagenPerfil = d.querySelector('#profileImage')
console.log("iamgen perfil:", imagenPerfil);

function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

const dropdownButton = d.querySelector('#dropdownButton')
dropdownButton.addEventListener('click', toggleMenu)

async function traerDatos(){
    //console.log(token);
    
    try{
        const response = await fetch(`${BACK_URL}/users/token`, {
            method: 'GET',
            headers: {
                'token': token
            }
        })
        //console.log("response", response);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const usuario = data.user[0]
        console.log("usuario",usuario);

        const fechaInicial = new Date(usuario.fecha_registro);
        const fechaNacimiento = new Date(usuario.fecha_nacimiento)

        const fechaFormateada = (fechaString, formato = 'YYYYMMDD') => {
            const fecha = new Date(fechaString);

            const agregarCero = (numero) => {
                return numero.toString().padStart(2, '0');
            };

            const anio = fecha.getFullYear();
            const mes = agregarCero(fecha.getMonth() + 1);
            const dia = agregarCero(fecha.getDate());
            switch (formato) {
                case "YYYYMMDD":
                    return `${anio}-${mes}-${dia}`;
                case "DDMMYYYY":
                    return `${dia}/${mes}/${anio}`;
                default:
                    return `${anio}/${mes}/${dia}`; // Formato por defecto si no se especifica
            }
        }

        userSince.innerHTML = `Miembro desde el ${fechaFormateada(fechaInicial, 'DDMMYYYY')}`
        userNamePerfil.innerHTML = usuario.nombre
        imagenPerfil.src = usuario.foto_perfil ==  null ? "/assets/minimalistic-user.jpeg" : `${usuario.foto_perfil}`

        //console.log(fechaFormateada(fechaNacimiento, 'YYYYMMDD'));
        
        nameForm.value = usuario.nombre;
        surnameForm.value = usuario.apellido;
        genderForm.value = usuario.genero;
        birthdateForm.value = fechaFormateada(fechaNacimiento, 'YYYYMMDD')
        emailForm.value = usuario.email
        passwordForm.value = '*********'
        nationalityForm.value = usuario.nacionalidad
        phoneForm.value = usuario.telefono
        languageForm.value = usuario.idiomas
        level_LanguageForm.value = usuario.nivel_idioma
        linkedinForm.value = usuario.linkedin
        githubForm.value = usuario.github
        socialForm.value = usuario.portfolio

        //console.log(genderForm.value);
        


    } catch(error){
        console.error('Error al cargar datos del usuario en la barra de navegacion:', error);
        
    }
}

traerDatos()

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addRowButton').addEventListener('click', function() {
        // Crear una nueva fila
        var table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();

        // Crear celdas para la nueva fila
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        // Agregar contenido a las celdas
        cell1.innerHTML = `
            <select class="language">
                <option value="language">Seleccionar</option>
                <option value="Inglés">Inglés</option>
                <option value="Alemán">Alemán</option>
                <option value="Coreano">Coreano</option>
                <option value="Italiano">Italiano</option>
            </select>
        `;
        cell2.innerHTML = `
            <select class="level">
                <option value="level">Seleccionar</option>
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
            </select>
        `;
        cell3.innerHTML = `
            <button type="button" class="deleteRowButton"><i class="fas fa-times"></i></button>
        `;

        // Añadir el manejador de eventos para el nuevo botón de eliminar
        cell3.querySelector('.deleteRowButton').addEventListener('click', function() {
            var row = this.closest('tr');
            row.parentNode.removeChild(row);
        });
    });

    const editPhotoBtn = document.getElementById('editPhotoBtn');
    const fileInput = document.getElementById('fileInput');
    const profileImage = document.getElementById('profileImage');
    
    editPhotoBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    

    // Añadir manejador de eventos a los botones de eliminar existentes
    document.querySelectorAll('.deleteRowButton').forEach(function(button) {
        button.addEventListener('click', function() {
            var row = this.closest('tr');
            row.parentNode.removeChild(row);
        });
    });


});
//Función para el dropdown del nav

const menu = document.getElementById('subMenu');
const button = document.getElementById('dropdownButton');
button.addEventListener('click', (e) =>{
    menu.classList.toggle('show');
    button.classList.toggle('active');
})
/*
const chatButton = document.querySelector('.chat-button')
console.log(chatButton);

chatButton.addEventListener('click', function() {
    window.location.href = "./chatprof-estudiante.html";
});
*/

// Mostrar, ocultar contraseña

function togglePassword() {
var passwordInput = document.getElementById('password');
var eyeIcon = document.getElementById('eye-icon');

if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
} else {
    passwordInput.type = 'password';
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
}
}

