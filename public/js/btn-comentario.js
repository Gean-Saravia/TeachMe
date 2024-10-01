const container = document.getElementById('commentContainer');
const button = document.getElementById('commentButton');
const modal = document.getElementById('thankYouModal');
const commentHistory = document.getElementById('commentHistory');

const user = {
  //Reemplazar ana garcia por id del usuario
  name: "Gean Saravia",
  avatar: "https://websim.creation.engine/user-avatar.jpg"
};

button.addEventListener('click', function() {
  const commentBox = document.createElement('div');
  commentBox.className = 'comment-box';
  commentBox.innerHTML = `
    <div class="comment-header">
      <div class="user-info">
        <img src="${user.avatar}" alt="Avatar de ${user.name}" class="user-avatar">
        <span class="user-name">${user.name}</span>
      </div>
      <button id="closeButton">×</button>
    </div>
    <textarea id="commentTextarea" placeholder="Escribe tu comentario aquí..."></textarea>
    <button id="submitButton">Enviar Comentario</button>
  `;

  container.appendChild(commentBox);
  button.style.display = 'none'; // Oculta el botón al abrir el comentario

  setTimeout(() => {
    commentBox.classList.add('show');
  }, 50);

  const closeButton = document.getElementById('closeButton');
  closeButton.addEventListener('click', resetCommentArea);

  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', submitComment);
});

function resetCommentArea() {
  const commentBox = document.querySelector('.comment-box');
  if (commentBox) {
    commentBox.classList.remove('show');
    setTimeout(() => {
      commentBox.remove();
      button.style.display = 'inline-flex'; // Muestra el botón de nuevo
    }, 1000);
  }
}

function submitComment() {
  const commentTextarea = document.getElementById('commentTextarea');
  const commentText = commentTextarea.value.trim();

  if (!commentText) {
    alert('Por favor, escribe un comentario.');
    return;
  }

  // Añadir el nuevo comentario a la lista de comentarios
  const newComment = {
    nombre: user.name,
    foto: user.avatar,
    texto: commentText,
    estrellas: 5,
  };

  // Agregar el nuevo comentario a la constante de comentarios
  comentarios.push(newComment);

  // Crear el elemento del nuevo comentario
  const comentarioElement = document.createElement('div');
  comentarioElement.className = 'comentario';
  comentarioElement.innerHTML = `
    <img src="${newComment.foto}" alt="Foto de ${newComment.nombre}" class="comentario-foto" width="60" height="60">
    <div class="comentario-contenido">
        <div class="comentario-nombre">${newComment.nombre}</div>
        <div class="comentario-estrellas">${'★'.repeat(newComment.estrellas)}${'☆'.repeat(5 - newComment.estrellas)}</div>
        <p class="comentario-texto">${newComment.texto}</p>

    </div>
  `;
  
  // Agregar el nuevo comentario al contenedor de comentarios
  const comentariosContainer = document.querySelector('.comentarios-container');
  comentariosContainer.appendChild(comentarioElement);

  resetCommentArea();
  showModal();
}

function showModal() {
  modal.classList.add('show');
}

const closeModalButton = document.querySelector('.modal-close');
closeModalButton.addEventListener('click', function() {
  modal.classList.remove('show');
});
