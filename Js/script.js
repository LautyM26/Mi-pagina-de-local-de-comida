let nombre
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let productoSeleccionado

const menu = document.getElementById("menu")
document.getElementById("botonContinuar").onclick = guardarNombre

fetch("../productos.json")
.then(response => response.json())
.then(data => {
    inicializarMenu(data)
})
.catch(err => console.error("Error al cargar los productos:", err));

function inicializarMenu(productos) {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.className = "card-img-top";
        card.appendChild(imagen);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = producto.nombre;
        cardBody.appendChild(cardTitle);

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerText = `Precio: $${producto.precio}`;
        cardBody.appendChild(cardText);

        const boton = document.createElement("button");
        boton.className = "btn btn-primary";
        boton.innerText = "Ordenar";
        boton.onclick = () => seleccionarProducto(producto);
        cardBody.appendChild(boton);

        card.appendChild(cardBody);
        menu.appendChild(card);
    });
}

{ 
    {
        const verPedidoButton = document.createElement("button")
        verPedidoButton.innerText = "Ver Pedido"
        verPedidoButton.onclick = verPedido
        menu.appendChild(verPedidoButton)
    }

    {
       const finalizarPedidoButton = document.createElement("button")

       finalizarPedidoButton.innerText = "Finalizar Pedido"
       finalizarPedidoButton.onclick = cuentaFinal
       menu.appendChild(finalizarPedidoButton)
    }

    {
        const vaciarCarritoButton = document.createElement("button")
        vaciarCarritoButton.innerText = "Vaciar Carrito"
        vaciarCarritoButton.onclick = vaciarCarrito; // Conector al evento vaciarCarrito
        menu.appendChild(vaciarCarritoButton);
    }

    document.getElementById("confirmarPedido").onclick = confirmarPedido
    document.getElementById("cancelar").onclick = cancelar
}    

inicializarMenu()

function guardarNombre() {
    nombre = document.getElementById("nombre").value;
    if (nombre) {
        document.getElementById("bienvenida").innerText = `Hola ${nombre}, a continuación tendrás la carta para hacer tu pedido.`
        document.getElementById("entrada").style.display = "none"
        menu.style.display = "block"
    }
}

function seleccionarProducto(producto) {
    productoSeleccionado = producto; 
    maxCantidad = producto.stock; 
    precioUnitario = producto.precio;

    document.getElementById("mensaje").innerText = 
        `¿Cuántas unidades de ${producto.nombre} desea ordenar? (Stock máximo: ${producto.stock})`

    document.getElementById("menu").style.display = "none"
    document.getElementById("detalle").style.display = "block"
}


function asignarValores (mensajeProducto, cantidad, precio) {
    mensaje = mensajeProducto
    maxCantidad = cantidad
    precioUnitario = precio
}

function asignarProducto(producto) {
    asignarValores(
        `¿cuantas unidades de ${producto.nombre} desea ordenar? (stock maximo: ${producto.stock})`, producto.stock, producto.precio
    );
}

function confirmarPedido() {
    let cantidad = parseInt(document.getElementById("cantidad").value)

    if (cantidad > 0 && cantidad <= maxCantidad) {
        let total = cantidad * precioUnitario;

        pedidos.push({
            producto: productoSeleccionado.nombre,
            cantidad: cantidad,
            total: total
        });

        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        Swal.fire({
            title: "Excelente",
            text: `Gracias, tu pedido de ${cantidad} ${productoSeleccionado.nombre}(s) ha sido realizado. Total: $${total}`,
            icon: "success"
        });

        document.getElementById("detalle").style.display = "none";
        document.getElementById("menu").style.display = "block";
        document.getElementById("cantidad").value = ""; 
    } else {
        Swal.fire({
            title: "ERROR",
            text: `Cantidad inválida. Por favor, selecciona entre 1 y ${maxCantidad}.`,
            icon: "error"
        });
    }
}

function verPedido() {
    let resumenContainer = document.getElementById("resumenPedidos")
    let listaPedidos = document.getElementById("listaPedidos")
    listaPedidos.innerHTML = "" 

    Swal.fire({
        text: "Abajo esta su carrito",
        icon: "info"
      });

    if (pedidos.length === 0) {
        let mensaje = document.createElement("li")
        mensaje.innerText = "No tienes ningún pedido en el carrito"
        listaPedidos.appendChild(mensaje)
    } else {
        pedidos.forEach(pedido => {
            let item = document.createElement("li")
            item.innerText = `${pedido.producto}: ${pedido.cantidad} unidad(es) - Total: $${pedido.total}`
            listaPedidos.appendChild(item)
        });
    }
    resumenContainer.style.display = "block"
}

function cuentaFinal() {
    if (pedidos.length === 0) {
        Swal.fire({
            title: "Porfavor",
            text: "Aun no has realizado ningun pedido",
            icon: "error"
          });
    } else {
        let totalGeneral = pedidos.reduce((acum, pedido) => acum + pedido.total, 0)
        Swal.fire({
            title: "¡Muchas Gracias!, Tu pedido ha sido realizado!",
            text: `Resumen final de tu pedido:\n Total a pagar: $${totalGeneral}`,
            icon: "success"
          });
    } 
    vaciarCarrito(false)
}

function vaciarCarrito(mostrarMensaje = true) {
    pedidos = []; 
    localStorage.removeItem("pedidos")

    let listaPedidos = document.getElementById("listaPedidos")
    listaPedidos.innerHTML = ""

    let mensaje = document.createElement("li")
    mensaje.innerText = "No tienes ningún pedido en el carrito"
    listaPedidos.appendChild(mensaje)

    if(mostrarMensaje) {
        Swal.fire({
         title: "Atencion",
         text: "El carrito ha sido vaciado.",
         icon: "info"
  });
    }
}

function cancelar() {
    document.getElementById("detalle").style.display = "none";
    document.getElementById("menu").style.display = "block";
    document.getElementById("cantidad").value = "";
    document.getElementById("mensaje").innerText = "";
}