document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const createButton = document.querySelector('.btn-crear');
    const tagContainers = document.querySelectorAll('.tag-container');

    // Toggle dropdown menu
    window.toggleMenu = () => {
        const menu = document.getElementById('subMenu');
        const button = document.getElementById('dropdownButton');
        menu.classList.toggle('show');
        button.classList.toggle('active');
    };

    // Manejo del envío de la clase
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Clase creada exitosamente!');
    });

    // Funcionalidad de configuración de etiquetas para Conocimientos y Redes sociales
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

    // Animación del botón al pasar el cursor
    createButton.addEventListener('mouseenter', () => {
        createButton.style.transition = 'transform 0.3s ease';
        createButton.style.transform = 'scale(1.05)';
    });
    createButton.addEventListener('mouseleave', () => {
        createButton.style.transform = 'scale(1)';
    });

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