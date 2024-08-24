//Función para intercambiar formularios
document.getElementById('toggleToSignUp').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('container').classList.add('active');
});

document.getElementById('toggleToSignIn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('container').classList.remove('active');
});

//Función para visibilidad de contraseñas
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.querySelector('#togglePassword');
    const toggleRepeatPassword = document.querySelector('#toggleRepeatPassword');
    const togglePasswordLogin = document.querySelector('#togglePasswordLogin');
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#repeat-password');
    const passwordLogin = document.querySelector('#password-login');

    function togglePasswordVisibility(toggleElement, passwordElement) {
        toggleElement.addEventListener('click', function () {
            const type = passwordElement.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordElement.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
            this.classList.toggle('fa-eye');
        });
    }

    togglePasswordVisibility(togglePassword, password);
    togglePasswordVisibility(toggleRepeatPassword, repeatPassword);
    togglePasswordVisibility(togglePasswordLogin, passwordLogin);
});
