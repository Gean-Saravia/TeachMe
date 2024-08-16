function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const addTagButtons = document.querySelectorAll('.add-tag');
    const createButton = document.querySelector('.btn-crear');

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Clase creada exitosamente!');
    });

    // Add new tags
    addTagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.closest('.tag-container');
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Nueva etiqueta';
            container.insertBefore(input, button);
        });
    });

    // Animate create button on hover
    createButton.addEventListener('mouseenter', () => {
        createButton.style.transition = 'transform 0.3s ease';
        createButton.style.transform = 'scale(1.05)';
    });
    createButton.addEventListener('mouseleave', () => {
        createButton.style.transform = 'scale(1)';
    });

    // Toggle active class in sidebar
    const sidebarLinks = document.querySelectorAll('.my-classes-container li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
        });
    });
});