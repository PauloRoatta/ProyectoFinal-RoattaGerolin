//Creo haber utilizado todo lo solicitado.
//Objetos y Arrays. Métodos de Arrays.
//Funciones y condicionales.
//Generación del DOM de forma dinámica. Eventos.
//Sintaxis avanzada.
//Al menos una librería de uso relevante para el proyecto.
//Manejo de promesas con fetch. 
//Carga de datos desde un JSON local o desde una API externa.

//Espero todo este bien y de caso contrario espero tu correción para seguir aprendiendo. Un saludo.



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



//////////////////// Funcion Oferta Aleatoria.

function funcionOferta() {
    const URLJSON5 = "./productosCards.json";
    fetch(URLJSON5)
        .then((result) => result.json())
        .then((productosCards) => {
            const productos = productosCards;
            let numeroAzar = Math.round(Math.random() * (productos.length - 1) + 1);
            let productoOferta = productos[numeroAzar];
            Swal.fire({
                title: 'Oferta Especial!!!',
                text: `Si llevas 700 unidades de "${productoOferta.nombre}", el precio unitario es de tan solo $1.\nNO TE LO PODES PERDER!!!`,
                imageUrl: 'https://media.giphy.com/media/eGlQwHgdNWynZzZTyA/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                background: "lightgrey",
                imageAlt: 'Oferta',
            })
        })
        .catch((e) => console.log(e))


}


/////////////// Inyeccion de Cartas de Productos.

let productosCartas = document.getElementById("prods");
productosCartas.classList.add("row");
productosCartas.classList.add("gap-3");
productosCartas.classList.add("mx-auto");
productosCartas.classList.add("my-auto");


function ObtenerProductos() {
    const URLJSON4 = "./productosCards.json";
    fetch(URLJSON4)
        .then((result) => result.json())
        .then((productosCards) => {
            const productos = productosCards;
            for (const producto of productos) {
                productosCartas.innerHTML += `
         <div class="card" style="width: 18rem;">
            <img src="${producto.foto}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h5 class="card-title">${producto.nombre}</h5>
                 <h6 class="card-title">Precio $${producto.precio}</h6>
               <button id="${producto.id}" class="btn btn-primary compra">Agregar al Carrito</button>
             </div>
         </div>
            `;

                /////////////////////// CARRITO
                //Funciones parra agregar productos al carrito y calculo de Total
                let botonCompra = document.getElementsByClassName("compra");
                for (const boton of botonCompra) {
                    boton.onclick = () => {
                        const prodCarro = productos.find((producto) => producto.id == boton.id);
                        agregarAlCarr(prodCarro);
                    }
                }
            }
        })
        .catch((e) => console.log(e))

}
ObtenerProductos();



let acumTot = 0;
function agregarAlCarr(prod) {
    carrito.push(prod);
    console.table(carrito);
    Toastify({
        text: `Agregaste ${prod.nombre} al carrito.`,
        duration: 1000,
        style: {
            background: "linear-gradient(to right, rgb(255, 0, 0), rgb(184, 40, 40))",
        },
        offset: {
            x: 50,
            y: 10,
        },
    }).showToast();
    tablaBody.innerHTML += `
      <tr>
        <td>${prod.id}</td>
        <td>${prod.nombre}</td>
        <td>${prod.precio}</td>
     </tr>
`;

    let totalCarrito = document.getElementById("total");


    totalCarrito.innerHTML = `
    Total a Pagar= $${acumTot += prod.precio}
    `;

    //localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalCarrito", acumTot);
}


/////////////// Inyeccion de Formulario.

let formularioNews = document.getElementById("InyectForm");
formularioNews.innerHTML += `
<section class="formYBotones">
<section class="FormularioSub">
<h3 class="Formulariotitle">Suscribete Al Newsletter</h3>
<form id="formulario">
  <label class="FormularioSubItem" for="nombre">
    Nombre y Apellido:
    <input type="text" name="nombre" id="nombre" placeholder="Pedro Suarez" />
  </label>
  <br>
  <label class="FormularioSubItem" for="email">
    Email:
    <input type="email" name="email" id="email" placeholder="pedrii23@gmail.com" />
    <small id="mensaje"></small>
  </label>
  <br>
  <input type="submit" value="Enviar" class="btn btn-success FormularioSubItem" />
  <input type="button" value="Borrar" class="btn btn-danger FormularioSubItem" onclick="borrarTodo()">
</form>
</section>
</section>
   `

/////////////// Inyeccion de BotonesVarios.

let btonesVarios = document.getElementById("InyectBtnsVarios");
btonesVarios.innerHTML += `
<div class="BotonesVarios">
<div>
<h4 class="BotonesVariosub">Ordenar Productos Por Precio</h4>
<button onclick="MenorAMayor()" class="btn btn-primary BotonesVariosub">Menor a Mayor</button>
<button onclick="MayorAMenor()" class="btn btn-primary BotonesVariosub">Mayor a Menor</button>
<button onclick="Predeterminado()" class="btn btn-primary BotonesVariosub">Predeterminado</button>
</div>
<div>
<h4 class="BotonesVariosub">Otras Opciones</h4>
<button onclick="funcionOferta()" class="btn btn-primary BotonesVariosub">Oferta Aleatoria</button>
<button id="modo" class="btn btn-primary BotonesVariosub">Dark Mode</button>
</div>
</div>
   `



// Carrito Abandonado
if (carrito.length != 0) {
    for (const prod of carrito) {
        tablaBody.innerHTML += `
    <tr>
    <td>${prod.id}</td>
    <td>${prod.nombre}</td>
    <td>${prod.precio}</td>
    </tr>
    `;
    }
    let totalCarrito = document.getElementById("total");
    acumTot = Number(localStorage.getItem("totalCarrito"));

    totalCarrito.innerHTML = `
    Total a Pagar= $${acumTot}
    `;
}

// Finalizar Compra y Vaciar Carrito
const botonFinalizar = document.getElementById("finalizar");
const botonVaciar = document.getElementById("vaciar");

botonFinalizar.onclick = () => {
    if (carrito == 0) {
        Swal.fire({
            title: 'El Carrito Esta Vacio',
            imageUrl: 'https://media.giphy.com/media/Az1CJ2MEjmsp2/giphy.gif',
            imageWidth: 400,
            imageHeight: 200,
            background: "lightgrey",
            imageAlt: 'Empty',
        })
    }
    else {
        Swal.fire({
            title: 'Compra Finalizada Exitosamente',
            text: "Muchas gracias por confiar en nosotros. Que lo disfrutes!",
            imageUrl: 'https://media.giphy.com/media/3oFzm64utSGoIBM26Q/giphy.gif',
            imageWidth: 400,
            imageHeight: 200,
            background: "lightgrey",
            imageAlt: 'Shop Bag',
        })
        carrito = [];
        tablaBody.innerText = " ";
        localStorage.setItem("carrito", JSON.stringify(carrito));
        let totalCarrito = document.getElementById("total");
        acumTot = 0;
        totalCarrito.innerHTML = `
      Total a Pagar= $
      `;
    }

}

botonVaciar.onclick = () => {
    if (carrito == 0) {
        Swal.fire({
            title: 'El Carrito Esta Vacio',
            imageUrl: 'https://media.giphy.com/media/Az1CJ2MEjmsp2/giphy.gif',
            imageWidth: 400,
            imageHeight: 200,
            background: "lightgrey",
            imageAlt: 'Empty',
        })
    }
    else {
        Swal.fire({
            title: 'Carrito Vaciado Exitosamente',
            imageUrl: 'https://media.giphy.com/media/xULW8N9O5WD32L5052/giphy.gif',
            imageWidth: 400,
            imageHeight: 200,
            background: "lightgrey",
            imageAlt: 'Delete This Simpsons',
        })
        carrito = [];
        tablaBody.innerText = " ";
        localStorage.setItem("carrito", JSON.stringify(carrito));
        let totalCarrito = document.getElementById("total");
        acumTot = 0;
        totalCarrito.innerHTML = `
    Total a Pagar= $
    `;
    }

}


////////////////////// FORMULARIO DE SUBSCRIPCION.
// label de nombre e email.
let nomYApe = document.getElementById("nombre");
let email = document.getElementById("email");

nomYApe.onkeyup = () => {
    if (nomYApe.value.length < 3) {
        nomYApe.style.color = "red";
    }
    else {
        nomYApe.style.color = "black";
    }
}
email.oninput = () => {
    if ((!email.value.includes("@")) || (!email.value.includes("."))) {
        document.getElementById("mensaje").innerText = "Direccion de Email Invalida."
        if (email.value == "") {
            document.getElementById("mensaje").innerText = " "
        }
    }
    else {
        document.getElementById("mensaje").innerText = " "
    }
}
// boton borrar todo.
function borrarTodo() {
    nomYApe.value = "";
    email.value = "";
}

// boton enviar.
const formulario = document.getElementById("formulario");

formulario.onsubmit = validar;


function validar(evento) {
    if ((nomYApe.value == "") || (email.value == "")) {
        evento.preventDefault();
        Swal.fire({
            title: 'Error!',
            text: "Ingrese nombre o email faltante.",
            imageUrl: 'https://media.giphy.com/media/Vu7FU5T4RJPo1esgna/giphy.gif',
            imageWidth: 400,
            imageHeight: 200,
            background: "lightgrey",
            imageAlt: 'Empty',
        })

    }
}

////////////////////// BOTONES ORDENAR PRECIO

function MenorAMayor() {
    const URLJSON3 = "./productosCards.json";
    fetch(URLJSON3)
        .then((result) => result.json())
        .then((productosCards) => {
            const produs = productosCards;
            produs.sort((a, b) => {
                if (a.precio == b.precio) {
                    return 0;
                }
                if (b.precio > a.precio) {
                    return -1;
                }
                return 1;
            });
            productosCartas.innerHTML = "";
            for (const producto of produs) {
                productosCartas.innerHTML += `
         <div class="card" style="width: 18rem;">
            <img src="${producto.foto}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h5 class="card-title">${producto.nombre}</h5>
                 <h6 class="card-title">Precio $${producto.precio}</h6>
               <button id="${producto.id}" class="btn btn-primary compra">Agregar al Carrito</button>
             </div>
         </div>
        `;
                let botonCompra = document.getElementsByClassName("compra");
                for (const boton of botonCompra) {
                    boton.onclick = () => {
                        const prodCarro = productos.find((producto) => producto.id == boton.id);
                        agregarAlCarr(prodCarro);
                    }
                }

            }
        })
        .catch((e) => console.log(e))
}

////////////

function MayorAMenor() {
    const URLJSON2 = "./productosCards.json";
    fetch(URLJSON2)
        .then((result) => result.json())
        .then((productosCards) => {
            const produs = productosCards;
            produs.sort((a, b) => {
                if (a.precio == b.precio) {
                    return 0;
                }
                if (a.precio > b.precio) {
                    return -1;
                }
                return 1;
            });
            productosCartas.innerHTML = "";
            for (const producto of produs) {
                productosCartas.innerHTML += `
         <div class="card" style="width: 18rem;">
            <img src="${producto.foto}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h5 class="card-title">${producto.nombre}</h5>
                 <h6 class="card-title">Precio $${producto.precio}</h6>
               <button id="${producto.id}" class="btn btn-primary compra">Agregar al Carrito</button>
             </div>
         </div>
        `;
                let botonCompra = document.getElementsByClassName("compra");
                for (const boton of botonCompra) {
                    boton.onclick = () => {
                        const prodCarro = productos.find((producto) => producto.id == boton.id);
                        agregarAlCarr(prodCarro);
                    }
                }
            }
        })
        .catch((e) => console.log(e))
}


///////////

function Predeterminado() {
    const URLJSON1 = "./productosCards.json";
    fetch(URLJSON1)
        .then((result) => result.json())
        .then((productosCards) => {
            const productos = productosCards;
            productosCartas.innerHTML = "";
            for (const producto of productos) {
                productosCartas.innerHTML += `
         <div class="card" style="width: 18rem;">
            <img src="${producto.foto}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h5 class="card-title">${producto.nombre}</h5>
                 <h6 class="card-title">Precio $${producto.precio}</h6>
               <button id="${producto.id}" class="btn btn-primary compra">Agregar al Carrito</button>
             </div>
         </div>
            `;
                let botonCompra = document.getElementsByClassName("compra");
                for (const boton of botonCompra) {
                    boton.onclick = () => {
                        const prodCarro = productos.find((producto) => producto.id == boton.id);
                        agregarAlCarr(prodCarro);
                    }
                }
            }
        })
        .catch((e) => console.log(e))
}


/////////////////BOTON LIGHT/DARK

const btnDkLt = document.getElementById("modo");
const bodyColor = document.getElementById("body");
if (localStorage.getItem("mode") == "dark") {
    bodyColor.classList.replace("light", "dark")
    btnDkLt.innerText = "Light Mode";
}
function pasarADark() {
    bodyColor.classList.replace("light", "dark")
    btnDkLt.innerText = "Light Mode";
    localStorage.setItem("mode", "dark")
};
function pasarALight() {
    bodyColor.classList.replace("dark", "light")
    btnDkLt.innerText = "Dark Mode";
    localStorage.setItem("mode", "light")
};
btnDkLt.onclick = () => {
    if (localStorage.getItem("mode") == "dark") {
        pasarALight();
    }
    else {
        pasarADark();
    }
}

//////////INTERVALO DE OFERTA
setInterval(() => {
    Toastify({
        text: `Ya probaste el boton de oferta aleatoria?\nPresionalo!!!No te vas a arrepentir.`,
        duration: 10000,
        close: true,
        style: {
            background: "linear-gradient(to right, rgb(255, 0, 0), rgb(184, 40, 40))",
        },
        offset: {
            x: 50,
            y: 10
        },
    }).showToast();
}, 30000)



//////////SALUDO DE BIENVENIDA
let hoy = new Date().getDay();
const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
Swal.fire({
    title: '¡Bienvenido!',
    text: `Hola bienvenido a Rockeala Indumentaria!!! Esperamos estes teniendo un lindo ${dias[hoy - 1]}`,
    imageUrl: 'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif',
    imageWidth: 400,
    imageHeight: 200,
    background: "lightgrey",
    imageAlt: 'Empty',
})
