//Función del navbar
function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

// Función para actualizar las estadísticas en tiempo real
function actualizarEstadisticas() {
    // Aquí se simularía una llamada a la API para obtener datos actualizados
    const estadisticas = {
        totalUsuarios: Math.floor(Math.random() * 3000) + 1500,
        usuariosActivos: Math.floor(Math.random() * 2000) + 1000,
        serviciosActivos: Math.floor(Math.random() * 100) + 50,
        ingresosMensuales: Math.floor(Math.random() * 20000) + 10000
    };

    document.querySelectorAll('.stat-card p').forEach((element, index) => {
        const key = Object.keys(estadisticas)[index];
        let valor = estadisticas[key];
        if (key === 'ingresosMensuales') {
            valor = '$' + valor.toLocaleString();
        }
        element.textContent = valor;
    });
}

// Actualizar estadísticas cada 5 segundos
setInterval(actualizarEstadisticas, 5000);

// Función para agregar nuevas actividades
function agregarNuevaActividad() {
    const actividades = [
        "Nuevo usuario registrado: Ana Martínez",
        "Usuario premium activado: Luis Sánchez",
        "Servicio finalizado: Desarrollo Web",
        "Nuevo pago registrado: $200 - Consultoría de Negocios",
        "Solicitud de soporte técnico: Plataforma de Pagos",
        "Usuario desactivado: Pedro Gómez",
        "Actualización de perfil: Laura Torres",
        "Nuevo servicio publicado: Traducción de Documentos",
        "Calificación recibida: 5 estrellas - Diseño de Logo"
    ];

    const actividadAleatoria = actividades[Math.floor(Math.random() * actividades.length)];
    const listaActividades = document.querySelector('.activity-list');
    const nuevaActividad = document.createElement('li');
    nuevaActividad.textContent = actividadAleatoria;

    listaActividades.insertBefore(nuevaActividad, listaActividades.firstChild);

    if (listaActividades.children.length > 5) {
        listaActividades.removeChild(listaActividades.lastChild);
    }
}

// Agregar nueva actividad cada 10 segundos
setInterval(agregarNuevaActividad, 10000);

// Event listeners para los enlaces del menú
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Navegando a: ' + this.textContent);
    });
});
