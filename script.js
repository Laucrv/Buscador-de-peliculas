let selector = document.getElementById('selector');
let busqueda = document.getElementById('busqueda');
let boton = document.getElementById('boton');
let resultado = document.getElementById('resultado');

let archivoSeleccionado = 'peliculas.json'; //Por defecto

//Lógica del selector
selector.addEventListener('change', cambiarEleccion);

function cambiarEleccion() {
    archivoSeleccionado = selector.value;
    let evento = new CustomEvent('cambio');
    selector.dispatchEvent(evento);
}

selector.addEventListener('cambio', mensaje);

function mensaje() {
    alert('El archivo de origen es: '+selector.value);
}

//Permitir únicamente letras en el input
busqueda.addEventListener('keydown', validarInput);
    
function validarInput(tecla) {
    if((tecla.keyCode < 65 || tecla.keyCode > 90) && tecla.keyCode != 32 && tecla.keyCode != 8) {
        tecla.preventDefault();
    }
}

//Realizar la búsqueda con el botón
boton.addEventListener('click', realizarBusqueda);

function realizarBusqueda() {
    resultado.innerHTML = '';

    fetch(archivoSeleccionado)
    .then(res => res.json())
    .then(function(salida) {
        for(let item of salida.data) {
            if(item.nombre.startsWith(busqueda.value.toUpperCase())) {
                let p = document.createElement('p');
                p.id = item.nombre;
                p.innerHTML = item.sinopsis;
                p.style.display = "none";

                let li = document.createElement('li');
                li.innerHTML = item.nombre;
                
                li.addEventListener('mouseover', function() {
                    let p = document.getElementById('item.nombre');
                    p.style.display = "block";
                });
                li.addEventListener('mouseout', function(){
                    let p = document.getElementById('item.nombre');
                    p.style.display = "none";
                });
                li.appendChild(p);
                resultado.appendChild(li);
            }
        }
    })
    .catch(error => console.error("Error:", error));
} 