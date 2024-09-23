// Agregar y quitar idiomas

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

    // Añadir manejador de eventos a los botones de eliminar existentes
    document.querySelectorAll('.deleteRowButton').forEach(function(button) {
        button.addEventListener('click', function() {
            var row = this.closest('tr');
            row.parentNode.removeChild(row);
        });
    });
});
//Función para el dropdown del nav
function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

document.querySelector('.chat-button').addEventListener('click', function() {
    window.location.href = "./chatprof-estudiante.html";
});


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




