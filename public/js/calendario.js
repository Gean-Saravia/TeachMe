//--------Declaración de variables------

//Definimos variables y seleccionamos elementos del html
//daystag selecciona los dias del calendario (7)
//currentDate selecciona el elemento que muestra el mes y año actual
//Selecciona los iconos de la flecha para navegar entre los meses
const daysTag = document.querySelector(".days"),
    currentDate= document.querySelector(".current-date"),
    prevNextIcon= document.querySelectorAll(".icons span");

//----------Inicializamos variables--------
//Date obtiene fecha y hora actual, curryear extrae el año actual, currmonth el mes actual
let date=new Date(), 
    currYear=date.getFullYear(),
    currMonth=date.getMonth();

//--------Declaramos los meses del año en un Array------
const months=[
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

//Función flecha para renderizar el calendario:
//Calculación de fechas, crea dias inactivos (llena el calendario con los dias de los meses anteriores y siguientes) (30,31, 1, 2)
//Marca el dia actual
const renderCalendar=() =>{ 
    let firtsDayofMonth= new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth= new Date(currYear, currMonth + 1 , 0).getDate(),
        lastDayofMonth= new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag="";

    for(let i = firtsDayofMonth; i > 0; i--){
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1 ; i <= lastDateofMonth; i++){
        let isToday =
        i == date.getDate() &&
        currMonth == new Date().getMonth() &&
        currYear == new Date().getFullYear()
            ? "active"
            : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for ( let i = lastDayofMonth; i < 6; i++){
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText= `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

//Inicializamos el calendario, llama a la funcion para mostrar el calendario cuando cargue la pagina
renderCalendar();

//Creamos un evento para cambiar de mes
//Agrega un evento cuando se le haga click a un icono (flechas), cambia el icono según el icono clickeado, si clickea el prv, le mostrará el mes anterior, y si no clickea ese, le muestra el mes proximo, si el mes esta fuera del rango (mes -1 o mes +12) ajusta el año y el mes
//Por ultimo llama a rendercalendar para actualizar el calendario con el nuevo mes. 
prevNextIcon.forEach((icon)=> {
    icon.addEventListener("click", ()=>{
        currMonth=icon.id == "prev"?currMonth-1: currMonth+1;
        if(currMonth<0 || currMonth>11){
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth= date.getMonth();
        } else{
            date = new Date();
        }
        renderCalendar();
    });
});
