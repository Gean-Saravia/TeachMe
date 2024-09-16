document.getElementById('openModalBtn').addEventListener('click', openModal); 

function openModal() {
    document.getElementById('modalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden'; 
    document.getElementById('pageOverlay').style.display = 'block'; // Mostrar el overlay
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.body.style.overflow = 'auto'; 
    document.getElementById('pageOverlay').style.display = 'none'; // Ocultar el overlay
}
function selectOption(button, group) {
    const buttons = button.parentElement.getElementsByClassName('option-button');
    Array.from(buttons).forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function selectPaymentMethod(method) {
    const options = document.getElementsByClassName('payment-option');
    Array.from(options).forEach(option => option.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    const cardDetails = document.getElementById('cardDetails');
    const cashDetails = document.getElementById('cashDetails');

    if (method === 'card') {
        cardDetails.style.display = 'grid';
        cardDetails.classList.add('grid-layout'); 
        cashDetails.style.display = 'none';
    } else if (method === 'cash') {
        cardDetails.style.display = 'none';
        cardDetails.classList.remove('grid-layout'); 
        cashDetails.style.display = 'block';
    }
}
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});


document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Aquí irían las validaciones y el procesamiento del pago
});

document.getElementById('closeModalBtn').addEventListener('click', closeModal);