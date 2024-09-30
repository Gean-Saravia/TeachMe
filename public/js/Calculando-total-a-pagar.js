// Inicializa MercadoPago
const mp = new MercadoPago('APP_USR-6ae9430e-e780-4773-8df7-135245e71d20', {
  locale: "es-AR"
});

let paymentBrickController = null; // Controlador del botón de pago
let totalCalculado = 0;

// Haciendo la cuenta del total:
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

// Escucha la selección de horas y calcula el total
canthoras.forEach(canthora => {
  canthora.addEventListener('click', () => {
      const valorCanthora = parseFloat(canthora.dataset.value);
      const precio = parseFloat(precioButton.textContent.replace('$', ''));
      totalCalculado = valorCanthora * precio;
      totalButton.textContent = `$${totalCalculado}`;
      updateCheckoutButton();
  });
});

// Función para crear o actualizar el botón de Mercado Pago
const updateCheckoutButton = async () => {
  try {
      const title = document.getElementById("asignatura").value;
      console.log("Título:", title);
      console.log("Total Calculado:", totalCalculado);

      // Validar que el total calculado es un número válido
      if (!isNaN(totalCalculado) && totalCalculado > 0) {
          const orderData = {
              title: title,
              quantity: 1,
              unit_price: totalCalculado, // Aquí pasamos el precio total
          };

          console.log("Datos de la orden:", orderData);

          // Crear preferencia en el backend
          const response = await fetch("http://localhost:3000/api/payment/create_preference", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
          });

          console.log("response", response);
          

          if (response?.ok) {
              const data = await response.json();
              const preferenceId = data.id;

              console.log("preferenceId:", preferenceId);

              // Si no existe el botón aún, se crea
              if (!paymentBrickController) {
                  const bricksBuilder = mp.bricks();
                  paymentBrickController = await bricksBuilder.create("wallet", "wallet_container", {
                      initialization: {
                          preferenceId: preferenceId, // Usamos la preferencia recién creada
                          redirectMode: "blank"
                      },
                      customization: {
                          visual: {
                              buttonBackground: '',
                              borderRadius: '10px',
                          },
                      },
                  });
                  console.log("Botón de Mercado Pago creado");
              } else {
                  // Si ya existe el botón, lo destruimos y lo recreamos con el nuevo amount
                  console.log("Actualizando el botón de Mercado Pago con el monto:", totalCalculado);
                  paymentBrickController.unmount();  // Desmontamos el botón actual

                  const bricksBuilder = mp.bricks();
                  paymentBrickController = await bricksBuilder.create("wallet", "wallet_container", {
                      initialization: {
                          preferenceId: preferenceId, // Usamos la preferencia actualizada
                          redirectMode: "blank"
                      },
                      customization: {
                          visual: {
                              buttonBackground: '',
                              borderRadius: '10px',
                          },
                      },
                  });
                  console.log("Botón actualizado y recreado con éxito");
              }
          } else {
              console.error("Error al crear la preferencia de Mercado Pago:", response.status, response.statusText);
              alert("Error al crear la preferencia de pago. Por favor, intenta nuevamente.");
          }
      } else {
          console.warn("El precio no está definido o no es válido. No se puede crear el botón de Mercado Pago.");
          alert("El precio no es válido. Por favor, verifica la información.");
      }
  } catch (error) {
      console.error("Error al actualizar el botón de Mercado Pago:", error);
      alert("Error al actualizar el botón de Mercado Pago. Por favor, intenta nuevamente.");
  }
};