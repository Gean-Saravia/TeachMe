import { d, BACK_URL } from "./variables.js"
const token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.querySelector('.btn-crear');
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    // Función para abrir el popup
    async function crearClase(event) {
        
        event.preventDefault(); // Previene el envío del formulario
        const materiaForm = d.getElementById('dropdown').value
        const precioForm = d.getElementById('precio').value
        const nombreForm = d.getElementById('nombreClase').value
        const descripcionForm = d.getElementById('descripcion').value
        try{
    
            const formulario = {
                materiaForm,
                precioForm: parseFloat(precioForm),
                nombreForm,
                descripcionForm
            }
    
            console.log("info del form:", formulario);
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

            if (!(materiaForm && precioForm && descripcionForm && nombreForm)) {
                alert("Complete todos los campos del formulario");
                return; // Prevent further execution if fields are empty
            }
            
            const responseClases = await fetch(`${BACK_URL}/classes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id_profesor": parseFloat(idUsuario), 
                        "id_materias": parseFloat(materiaForm),
                        "titulo": nombreForm,
                        "descripcion": descripcionForm,
                        "precio_hora": parseFloat(precioForm)
                    })
                })
                //console.log("responseClases", responseClases);
                
                if (!responseClases.ok) {
                    throw new Error(`Error: ${responseClases.status}`);
                }
                const dataClasesProf = await responseClases.json()
                //console.log("response de CLASES CONTRATADAS:",dataClasesProf);
                popup.classList.add("open-popup");
                overlay.style.display = "block";
                d.querySelector('.main-content form').reset()
            
            
        } catch(error){
            console.error('Hubo un problema con la petición:', error);
        }
    }

    // Función para cerrar el popup
    function closePopup() {
        popup.classList.remove("open-popup");
        overlay.style.display = "none";
    }

    function highlightItem(element) {
        const items = document.querySelectorAll("#class-list .item");
        items.forEach(item => item.classList.remove("highlight"));
        element.classList.add("highlight");
    }

    // Animación del botón al pasar el cursor
    createButton.addEventListener('mouseenter', () => {
        createButton.style.transition = 'transform 0.3s ease';
        createButton.style.transform = 'scale(1.05)';
    });

    createButton.addEventListener('mouseleave', () => {
        createButton.style.transform = 'scale(1)';
    });

    // Evento para abrir el popup al hacer clic en el botón
    createButton.addEventListener('click', crearClase);

    // Evento para cerrar el popup si se hace clic en el overlay
    overlay.addEventListener('click', closePopup);

    // Evento para cerrar el popup si se hace clic en el botón "OK"
    const okButton = document.querySelector('.popup button');
    if (okButton) {
        okButton.addEventListener('click', closePopup);
    }

    // Función para toggle del menú
    window.toggleMenu = () => {
        const menu = document.getElementById('subMenu');
        const button = document.getElementById('dropdownButton');
        menu.classList.toggle('show');
        button.classList.toggle('active');
    };

    // Funcionalidad de configuración de etiquetas para Conocimientos y Redes sociales
    const tagContainers = document.querySelectorAll('.tag-container');

    tagContainers.forEach(container => {
        const addTagBtn = container.querySelector('.add-tag');
        const input = container.querySelector('input') || document.createElement('input');
        if (!container.contains(input)) {
            input.type = 'text';
            input.placeholder = container.closest('.form-group').querySelector('label').textContent;
            input.style.display = 'none';
            container.insertBefore(input, addTagBtn);
        }

        addTagBtn.addEventListener('click', () => {
            if (input.style.display === 'none') {
                input.style.display = 'inline-block';
                input.focus();
            } else {
                addTag(container, input);
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Función para tecla
                addTag(container, input);
            }
        });
    });

    function addTag(container, input) {
        const text = input.value.trim();
        if (text !== '') {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = text;
            
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-tag';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.addEventListener('click', () => {
                container.removeChild(tag);
            });

            tag.appendChild(deleteBtn);
            container.insertBefore(tag, input);
            input.value = '';
            input.focus(); // Mantiene enfocada la entrada para agregar más etiquetas
        }
    }

    // Toggle ativo en la barra lateral
    const sidebarLinks = document.querySelectorAll('.my-classes-container li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
        });
    });

    function highlightItem(selectedItem) {
        // Elimina la clase 'selected' de todos los ítems
        var items = document.querySelectorAll('#class-list .item');
        items.forEach(function (item) {
            item.classList.remove('selected');
        });
    
        // Añade la clase 'selected' al ítem que se ha hecho clic
        selectedItem.classList.add('selected');
    }

    const claseProfeLista = d.querySelector('#class-list')

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
            //console.log("response de CLASES CONTRATADAS:",dataClasesProf);
    
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
            
        } catch(error){
            console.error('Hubo un problema con la petición:', error);
        }
    }

    const dropdownMaterias = d.querySelector('#dropdown')

    async function mostrarMateriasDisponibles(){
        try{
            const response = await fetch(`${BACK_URL}/courses`, {
                method: 'GET'
            })
            //console.log("response de token", response);
            
            if (!response.ok) {
                //alert('Su sesión expiró, por favor vuelva a logearse')
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log("data de crea tu clase",data);

            if(data.length > 0){
                data.forEach(materia => {
                    
                    const materiaListada = d.createElement('option');
                    materiaListada.value = `${materia.id}`;
                    materiaListada.innerText = `${materia.nombre_materia}`;
    
                    dropdownMaterias.appendChild(materiaListada)
                    
                })
            } else {
                console.log("No hay clases contratadas!");
            }
        } catch(error){
            console.error('Hubo un problema con la petición:', error);
        }
    }
    mostrarClasesProfesor()
    mostrarMateriasDisponibles()
});


function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

const dropdownButton = d.querySelector('#dropdownButton')
dropdownButton.addEventListener('click', toggleMenu)