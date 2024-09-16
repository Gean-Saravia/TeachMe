//Función del navbar
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

// Marca "Python" como seleccionado por defecto al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    var pythonItem = document.getElementById('python-item');
    if (pythonItem) {
        highlightItem(pythonItem);
    }
});

// Función para filtrar tarjetas según el texto del buscador
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-bar');
    const cards = document.querySelectorAll('.card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const cardContent = card.textContent.toLowerCase();
            if (cardContent.includes(searchTerm)) {
                card.style.display = ''; // Mostrar la tarjeta
            } else {
                card.style.display = 'none'; // Ocultar la tarjeta
            }
        });
    });
});

// Ejecutar las funciones cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    renderTeacherCards();
    setupSearchFilter();
});

