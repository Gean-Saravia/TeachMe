
// Función para filtrar tarjetas según el texto del buscador
function setupSearchFilter() {
    const searchInput = document.querySelector('.Buscador input');
    searchInput.addEventListener('input', () => {
        const filterText = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.cards-conteiner .card');
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const subject = card.querySelector('p').textContent.toLowerCase();
            if (name.includes(filterText) || subject.includes(filterText)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Ejecutar las funciones cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    renderTeacherCards();
    setupSearchFilter();
});

