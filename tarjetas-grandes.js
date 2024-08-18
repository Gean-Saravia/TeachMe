const teachersData = [
    { name: "Lionel Messi", rating: 5, subject: "Python" },
    { name: "Henry Cavill", rating: 4, subject: "Python" },
    { name: "Adele Adkins", rating: 5, subject: "Python" },
    { name: "Paulo Dybala", rating: 3.5, subject: "Python" },
    { name: "Pedro Martin", rating: 5, subject: "Python" },
    { name: "Mirtha Legrand", rating: 5, subject: "Python" }
];

function createTeacherCards() {
    const cardsContainer = document.querySelector('.cards-container');
    teachersData.forEach(teacher => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${teacher.name.toLowerCase().replace(' ', '-')}.jpg" alt="${teacher.name}">
            <h3>${teacher.name}</h3>
            <p>${teacher.subject}</p>
            <div class="rating">${'★'.repeat(teacher.rating)}</div>
            <button>Contratar</button>
        `;
        cardsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', createTeacherCards);