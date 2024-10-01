//Función del navbar
function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}
function seleccionarPlan(plan) {
    // Mostrar el modal
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Lanzar confeti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4FB0C6', '#FFD700']  // Azul y dorado
    });
}

// Cerrar el modal cuando se hace clic en la X
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    closeModal();
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}
