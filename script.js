let nombre
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let productoSeleccionado

const menu = document.getElementById("menu")
document.getElementById("botonContinuar").onclick = guardarNombre

const productos = [
    { nombre: "Pizza", precio: 8000, stock: 200 },
    { nombre: "Hamburguesa", precio: 6000, stock: 300 },
    { nombre: "Pancho", precio: 3000, stock: 500 },
    { nombre: "Fideos", precio: 7500, stock: 100 },
    { nombre: "Sushi", precio: 13000, stock: 100 },
]

function inicializarMenu () {
    const menu = document.getElementById("menu")

    productos.forEach(producto => {
        const boton = document.createElement("button")
        boton.innerText = `${producto.nombre} ($${producto.precio})`
        boton.onclick = () => seleccionarProducto(producto)
        menu.appendChild(boton)
    })
    
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

    document.getElementById("confirmarPedido").onclick = confirmarPedido
    document.getElementById("cancelar").onclick = cancelar
}

inicializarMenu()


function guardarNombre() {
    nombre = document.getElementById("nombre").value
    if (nombre) {
        document.getElementById("bienvenida").innerText = `Hola ${nombre}, a continuación tendrás la carta para hacer tu pedido.`
        document.getElementById("entrada").style.display = "none"
        document.getElementById("menu").style.display = "block"
    }
}

function seleccionarProducto(producto) {
    productoSeleccionado = producto;
    asignarProducto(producto);
    document.getElementById("mensaje").innerText = mensaje;
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
    document.getElementById("confirmarPedido").onclick = function() {
        let cantidad = parseInt(document.getElementById("cantidad").value)
        if (cantidad > 0 && cantidad <= maxCantidad) {
            let total = cantidad * precioUnitario
            pedidos.push({producto: productoSeleccionado.nombre, cantidad: cantidad, total: total})

            localStorage.setItem("pedidos", JSON.stringify(pedidos));
    
            alert(`Muchas gracias, tu pedido de ${cantidad} ${productoSeleccionado.nombre}(s) ha sido realizado. Total: $${total}`)
        } else {
            alert(`No podemos procesar esa cantidad. Por favor, elige lo que dice la consigna`)
        }
        document.getElementById("detalle").style.display = "none"
        document.getElementById("menu").style.display = "block"
    }
}

function verPedido() {
    let resumenContainer = document.getElementById("resumenPedidos")
    let listaPedidos = document.getElementById("listaPedidos")
    listaPedidos.innerHTML = "" 

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
        alert("Aun no has realizado ningun pedido")
    } else {
        let totalGeneral = pedidos.reduce((acum, pedido) => acum + pedido.total, 0)
        alert(`Resumen final de tu pedido:\n Total a pagar: $${totalGeneral}`)
    } 
}

function cancelar() {
    document.getElementById("detalle").style.display = "none"
    document.getElementById("menu").style.display = "block"
    document.getElementById("cantidad").value = ""
    document.getElementById("mensaje").innerText = ""
}