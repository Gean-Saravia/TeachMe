function toggleMenu() {
    const menu = document.getElementById('subMenu');
    const button = document.getElementById('dropdownButton');
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const conversationsElement = document.getElementById('conversations');
    const chatHeader = document.getElementById('chatHeader');
    const chatAvatar = document.getElementById('chatAvatar');
    const chatUserName = document.getElementById('chatUserName');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');

    const conversations = [
        {
            id: 1,
            fullName: 'Gean Seravia',
            lastMessage: 'Hola, tengo una duda...',
            profilePic: '/assets/student.jpg',
            messages: [
                { text: 'Hola, tengo una duda sobre el proyecto.', sender: 'student', timestamp: '10:30 AM' },
                { text: 'Si gana boca, ¿me lo aprueba?.', sender: 'student', timestamp: '10:31 AM' },
                { text: 'No, siga con el proyecto.', sender: 'teacher', timestamp: '10:32 AM' },
            ],
            messageCount: 2,
        },
        {
            id: 2,
            fullName: 'Jazmín Ferreyra',
            lastMessage: 'Holis <3 Profe...',
            profilePic: '/assets/icon-jaz.jpg',
            messages: [
                { text: 'Holis <3 Profe ¿Puede revisar mi tarea?', sender: 'student', timestamp: '11:00 AM' },
                { text: 'Claro, ¿Te parece bien a la tarde?', sender: 'teacher', timestamp: '11:15 AM' },
                { text: '❤️', sender: 'student', timestamp: '11:18 AM' },
            ],
            messageCount: 1,
        },
        {
            id: 3,
            fullName: 'Laura Fernandez',
            lastMessage: 'A la tarde tengo...',
            profilePic: '/assets/icon-lau.jpg',
            messages: [
                { text: '¿Tiene disponible la próxima clase del lunes?', sender: 'student', timestamp: '11:15 AM' },
                { text: 'Claro, ¿Te parece bien a la tarde?', sender: 'teacher', timestamp: '11:35 AM' },
                { text: 'A la tarde tengo una partida, ¿puede ser a la mañana?.', sender: 'student', timestamp: '11:38 AM' },
            ],
            messageCount: 1,
        },
        {
            id: 4,
            fullName: 'Celeste Carrizo',
            lastMessage: 'Buen día, profe...',
            profilePic: '/assets/icon-cc.jpg',
            messages: [
                { text: 'Buen día, profesor le queria comentar que su clase fue magistral.', sender: 'student', timestamp: '11:50 AM' },
                { text: 'Muchas gracias! me alegro que...', sender: 'teacher', timestamp: '11:51 AM' },
                { text: 'Pero me hubiese gustado que no usara Linux.', sender: 'student', timestamp: '11:51 AM' },
                { text: 'ᵃ', sender: 'teacher', timestamp: '11:52 AM' },
            ],
            messageCount: 1,
        },
    ];

    let selectedConversation = null;

    function renderConversations() {
        conversationsElement.innerHTML = '';
        conversations.forEach(conversation => {
            const conversationElement = document.createElement('div');
            conversationElement.className = 'conversation';
            conversationElement.innerHTML = `
                <div class="avatar">
                    <img src="${conversation.profilePic}" alt="user avatar">
                </div>
                <div class="conversation-details">
                    <p class="user-name">${conversation.fullName}</p>
                    <span class="last-message">${conversation.lastMessage}</span>
                </div>
                <div class="message-count">${conversation.messageCount}</div>
            `;
            conversationElement.addEventListener('click', () => selectConversation(conversation));
            conversationsElement.appendChild(conversationElement);
        });
    }

    function selectConversation(conversation) {
        selectedConversation = conversation;
        chatAvatar.src = conversation.profilePic;
        chatUserName.innerText = conversation.fullName;
        renderMessages();
    }

    function renderMessages() {
        chatMessages.innerHTML = '';
        selectedConversation.messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.sender}-message`;
            messageElement.innerHTML = `
                <p>${message.text}</p>
                <span class="timestamp">${message.timestamp}</span>
            `;
            
            if (message.sender === 'teacher') {
                messageElement.classList.add('teacher');
            } else {
                messageElement.classList.add('student');
            }
    
            chatMessages.appendChild(messageElement);
        });
    }
    

    sendMessageBtn.addEventListener('click', () => {
        if (!selectedConversation) return;

        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        const newMessage = {
            text: messageText,
            sender: 'teacher',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        selectedConversation.messages.push(newMessage);
        selectedConversation.messageCount = 0;
        messageInput.value = '';
        renderMessages();
        renderConversations();
    });

    renderConversations();
});

// Selecciona el campo de entrada de mensaje y el botón de enviar
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessageBtn');

// Añade un evento de teclado al campo de entrada
messageInput.addEventListener('keydown', function(event) {
  // Verifica si la tecla presionada es Enter
  if (event.key === 'Enter') {
    event.preventDefault(); // Evita que se inserte un salto de línea
    sendButton.click(); // Simula un clic en el botón de enviar
  }
});