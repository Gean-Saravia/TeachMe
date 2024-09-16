function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}


// Alternar visibilidad de la contraseña
document.querySelector('.toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
});

// Agregar y eliminar idiomas
document.querySelector('.add-language').addEventListener('click', function () {
    const languageDiv = document.createElement('div');
    languageDiv.classList.add('language');
    languageDiv.innerHTML = `
      <select name="language[]">
        <option value="english">Inglés</option>
        <option value="spanish">Español</option>
        <option value="french">Francés</option>
      </select>
      <select name="level[]">
        <option value="basic">Básico</option>
        <option value="intermediate">Intermedio</option>
        <option value="advanced">Avanzado</option>
      </select>
      <button type="button" class="remove-language">Eliminar</button>
    `;
    document.querySelector('.languages').insertBefore(languageDiv, document.querySelector('.add-language'));

    // Agregar evento para eliminar idioma
    languageDiv.querySelector('.remove-language').addEventListener('click', function () {
        languageDiv.remove();
    });
});

// Eliminar idiomas existentes
document.querySelectorAll('.remove-language').forEach(button => {
    button.addEventListener('click', function () {
        button.parentElement.remove();
    });
});
