import { d, BACK_URL } from "./variables.js"
const token = localStorage.getItem('token')

function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

function highlightItem(selectedItem) {
    // Elimina la clase 'selected' de todos los ítems
    var items = document.querySelectorAll('#class-list .item');
    items.forEach(function (item) {
        item.classList.remove('selected');
    });

    // Añade la clase 'selected' al ítem que se ha hecho clic
    selectedItem.classList.add('selected');
}


// Funciones del calendario

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es', // Configurar el idioma español
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        eventColor: '#00bfff', // Color celeste para los eventos
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: function(info) {
            var title = prompt('Introduce el nombre de la clase:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.dateStr,
                    allDay: true
                });
            }
        },
        eventClick: function(info) {
            if (confirm("¿Quieres eliminar esta clase?")) {
                info.event.remove();
            }
        }
    });

    calendar.render();
});

const claseProfeLista = d.querySelector('#class-list')
const fotoCalendario = d.querySelector('.profile-info>img')
const nombreCalendario = d.querySelector('.profile-info>h2')

// Funcion para mostrar todas las clases que hayan sido creadas por el usuario (es decir, en las que es profesor)
async function mostrarClasesProfesor(){
    
    try{
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
        const data = await responseToken.json();
        const usuario = data.user[0]
        const idUsuario = usuario.id
        //console.log("usuario",usuario);

        const responseClases = await fetch(`${BACK_URL}/classes?id_profesor=${idUsuario}`, {
            method: 'GET',
        })
        
        if (!responseClases.ok) {
            throw new Error(`Error: ${responseClases.status}`);
        }
        const dataClasesProf = await responseClases.json()
        console.log("response de CLASES CONTRATADAS:",dataClasesProf);

        if(dataClasesProf.length > 0){
            dataClasesProf.forEach(clase => {
                
                const claseListada = d.createElement('li');
                claseListada.className = 'item';
                claseListada.innerText = `${clase.titulo}`;

                claseListada.addEventListener('click', () => highlightItem(this))

                claseProfeLista.appendChild(claseListada)
                
            })
        } else {
            console.log("No hay clases contratadas!");
        }
        nombreCalendario.innerText = `${usuario.nombre}`
        fotoCalendario.src = usuario.foto_perfil ==  null ? "/assets/Icon-user.png" : `${usuario.foto_perfil}`
        fotoCalendario.alt = `${usuario.nombre}`
        
    } catch(error){
        console.error('Hubo un problema con la petición:', error);
    }
}

const claseAlumnoLista = d.querySelector('.subjects')
const tablaAlumnoLista = d.querySelector('.class-table>tbody')

async function mostrarClasesEstudiante(){
    try{
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
        const data = await responseToken.json();
        const usuario = data.user[0]
        const idUsuario = usuario.id
        //console.log("usuario",usuario);

        const responseClases = await fetch(`${BACK_URL}/hirings?id_alumno=${idUsuario}`, {
            method: 'GET',
        })
        
        if (!responseClases.ok) {
            throw new Error(`Error: ${responseClases.status}`);
        }
        const dataClasesAlum = await responseClases.json()
        console.log("response de CLASES ASISTIDAS:",dataClasesAlum);

        if(dataClasesAlum.length > 0){
            dataClasesAlum.forEach(clase => {
                
                const claseListada = d.createElement('div');
                claseListada.className = 'subject';
                claseListada.innerHTML = `
                    <h3>${clase.clase}</h3>
                    <span class="profile-icon">👨‍💼</span>
                    <p>Docente: ${clase.profesor}</p>
                `;
                claseAlumnoLista.appendChild(claseListada)                
                
                const tablaListada = d.createElement('tr')
                
                const fecha = new Date(clase.fecha_contratacion);
                // Obtener las partes de la fecha y formatearlas
                const dia = fecha.getDate().toString().padStart(2, '0'); // Aseguramos dos dígitos para el día
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes porque enero es 0
                const año = fecha.getFullYear();

                // Crear la cadena formateada
                const fechaFormateada = `${dia}/${mes}/${año}`;

                //console.log("fecha:", fechaFormateada);
                
                tablaListada.innerHTML = `
                    <td>${clase.clase}</td>
                    <td>${clase.profesor} ${clase.profe_apellido}</td>
                    <td>$${clase.total.toLocaleString('es-ES')}</td>
                    <td>${fechaFormateada}</td>
                `;
                tablaAlumnoLista.appendChild(tablaListada)

            })
        } else {
            console.log("No hay clases contratadas!");
        }
        
    } catch(error){
        console.error('Hubo un problema con la petición:', error);
    }
}
mostrarClasesProfesor()
mostrarClasesEstudiante()