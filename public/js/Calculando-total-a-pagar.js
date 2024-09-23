const canthoras = document.querySelectorAll('.dropdown-menu li'); 
const precioButton = document.getElementById('precio'); 
const totalButton = document.querySelector('.total .option-button'); // Selecciona el botón del total

canthoras.forEach(canthora => {
  canthora.addEventListener('click', () => {
    const valorCanthora = parseFloat(canthora.dataset.value);
    const precio = parseFloat(precioButton.textContent.replace('$', ''));
    const total = valorCanthora * precio;

    totalButton.textContent = `$${total}`; // Actualiza el texto del botón Total
    console.log(total); // Muestra en la consola
  });
});