//Función para el dropdown del nav
function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

//Función para agregar o quitar idiomas y nivel
document.getElementById("addRowButton").addEventListener("click", function () {
            
    var table = document.getElementById("myTable");
    var tbody = table.getElementsByTagName("tbody")[0];

    
    var newRow = document.createElement("tr");

    var languageCell = document.createElement("td");
    var levelCell = document.createElement("td");
    var deleteButtonCell = document.createElement("td");

    
    var languageSelect = document.createElement("select");
    languageSelect.className = "language";
    languageSelect.innerHTML = `
        <option value="language">Seleccionar</option>
        <option value="Inglés">Inglés</option>
        <option value="Alemán">Alemán</option>
        <option value="Coreano">Coreano</option>
        <option value="Italiano">Italiano</option>
    `;

    var levelSelect = document.createElement("select");
    levelSelect.className = "level";
    levelSelect.innerHTML = `
        <option value="level">Seleccionar</option>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
    `;

    
    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "deleteRowButton";
    var icon = document.createElement("i");
    icon.className = "fas fa-times"
    deleteButton.appendChild(icon);

    
    deleteButton.addEventListener("click", function () {
        tbody.removeChild(newRow);
    });

    
    languageCell.appendChild(languageSelect);
    levelCell.appendChild(levelSelect);
    deleteButtonCell.appendChild(deleteButton);

    
    newRow.appendChild(languageCell);
    newRow.appendChild(levelCell);
    newRow.appendChild(deleteButtonCell);

    
    tbody.appendChild(newRow);
});

document.querySelectorAll(".deleteRowButton").forEach(function(button) {
    button.addEventListener("click", function() {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    });
});

//Función para recordar y editar los campos importantes
function editField(fieldId) {
var input = document.getElementById(fieldId);
var isReadOnly = input.hasAttribute('readonly');

if (isReadOnly) {
    input.removeAttribute('readonly');
    input.style.backgroundColor = 'white';
    input.style.color = 'black'
    input.focus();
    input.parentElement.classList.add('edit-mode');
} else {
    input.setAttribute('readonly', true);
    input.style.backgroundColor = ''; 
    input.style.color = '';
    input.parentElement.classList.remove('edit-mode');
}
}


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

