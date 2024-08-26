document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.querySelector('.btn-crear');
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    // Función para abrir el popup
    function openPopup(event) {
        event.preventDefault(); // Previene el envío del formulario
        popup.classList.add("open-popup");
        overlay.style.display = "block";
    }

    // Función para cerrar el popup
    function closePopup() {
        popup.classList.remove("open-popup");
        overlay.style.display = "none";
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
    createButton.addEventListener('click', openPopup);

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
});