//Arregle notificacion(copie cosas del archivo q subio cami)
const FAQData = [
    {
        question: "¿Qué es TeachMe?",
        answer: [
            "Una plataforma educativa intermediaria entre profesores y estudiantes.",
            "Un medio para el aprendizaje continuo.",
        ],
    },
    {
        question: "¿Cómo funciona TeachMe como plataforma educativa?",
        answer: [
            "Registro: Los profesores y docentes se registran en la plataforma creando un perfil.",
            "Conexión: Los usuarios pueden buscar y conectar con otros profesionales para ofrecer o recibir clases.",
            "Gestión de Clases: TeachMe proporciona herramientas para gestionar clases, programar sesiones y realizar pagos",
        ],
    },
    {
        question: "¿Qué beneficios ofrece TeachMe a los profesores?",
        answer: [
            "Acceso a una Red de Estudiantes: Los profesores pueden llegar a una amplia audiencia de estudiantes potenciales.",
            "Flexibilidad: Los profesores pueden establecer sus propios horarios y tarifas, trabajando desde cualquier lugar.",
        ],
    },
    {
        question: "¿Qué beneficios obtienen los alumnos al usar TeachMe?",
        answer: [
            "Acceso a Profesores Calificados: Los alumnos pueden elegir entre una amplia gama de profesores expertos en diversas materias.",
            "Flexibilidad Horaria: Permite a los alumnos programar clases según su conveniencia y ritmo de aprendizaje.",
            "Recursos Educativos: Acceso a materiales adicionales y recursos educativos proporcionados por los profesores para apoyar el aprendizaje.",
        ],
    },
];
const FAQContainer = document.querySelector(".faq-container");
const removeAllExpanded = () => {
    const questionContainers = document.querySelectorAll(
        ".faq-container .question-container"
    );
    questionContainers.forEach((q) => {
        q.classList.remove("expanded");
        const answerContainer = q.querySelector(".answer-container");
        answerContainer.style.maxHeight = "0";
    });
};
const displayFAQ = () => {
    FAQData.forEach((q) => {
        const answerHTML = q.answer
            .map(
                (a) => `<div class="answer">
            <span class="answer-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
            >
                <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
                />
            </svg>
            </span>
            ${a}
        </div>`
            )
            .join("");
        const html = `<div class="question">
            ${q.question}
            <span class="question-icon">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </span>
        </div>
        <div class="answer-container">
            ${answerHTML}
        </div>`;
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");
        questionContainer.innerHTML = html;
        FAQContainer.appendChild(questionContainer);
        const question = questionContainer.querySelector(".question");
        question.addEventListener("click", () => {
            if (!questionContainer.classList.contains("expanded")) {
                removeAllExpanded();
            }
            questionContainer.classList.toggle("expanded");
            const isExpanded = questionContainer.classList.contains("expanded");
            const answerContainer = questionContainer.querySelector(".answer-container");
            const contentHeight = answerContainer.scrollHeight;
            answerContainer.style.maxHeight = isExpanded ? `${contentHeight}px` : "0";
        });
    });
};

// Call the function to display FAQ when the page loads
document.addEventListener('DOMContentLoaded', displayFAQ);


// Funcionalidad para el formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // Enviar los datos a un servidor (ejemplo)
        fetch('https://tuservidor.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => response.json())
        .then(data => {
            // Si el envío es exitoso, puedes manejar la respuesta aquí
            console.log('Datos enviados:', data);
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
        });

        // Limpia el formulario sin mostrar alertas
        this.reset();
    }
});


// Funcionalidad de la notificación tipo "toast"
const contactForm = document.getElementById('contactForm');
const toast = document.querySelector('.toast');
const closeIcon = document.querySelector('.close');
const progress = document.querySelector('.progress');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el envío del formulario

    // Mostrar la notificación
    toast.classList.add('active');
    progress.classList.add('active');

    // Ocultar la notificación después de un tiempo
    setTimeout(() => {
        toast.classList.remove('active');
        progress.classList.remove('active');

        // Recargar la página después de que se oculta la notificación
        location.reload();
    }, 5000);
});

// Cerrar la notificación al hacer clic en el icono de cerrar
closeIcon.addEventListener('click', () => {
    toast.classList.remove('active');
    progress.classList.remove('active');

});

const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    //menu
    abrir.addEventListener("click", () => {
        nav.classList.add("visible");
    })

    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    })