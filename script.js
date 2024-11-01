let nombre
let pedidos = []
let productoSeleccionado

const menu = document.getElementById("menu")
document.getElementById("botonContinuar").onclick = guardarNombre

const productos = [
    { nombre: "Pizza", precio: 8000 },
    { nombre: "Hamburguesa", precio: 6000 },
    { nombre: "Pancho", precio: 3000 },
    { nombre: "Fideos", precio: 7500 },
    { nombre: "Sushi", precio: 13000 },
]

productos.forEach(producto => {
    const boton = document.createElement("button")
    boton.innerText = `${producto.nombre} ($${producto.precio})`
    boton.onclick = () => seleccionarProducto(producto.nombre.toLowerCase())
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

    let mensaje = ""
    let maxCantidad = 0
    let precioUnitario = 0


    function asignarValores (mensajeProducto, cantidad, precio) {
        mensaje = mensajeProducto
        maxCantidad = cantidad
        precioUnitario = precio
    }


    function asignarProducto(producto) {
        switch (producto) {
            case "pizza":
                asignarValores("¿cuantas pizzas desea ordenar? (stock maximo 300 pizzas)", 300, 8000)
                break
            case "hamburguesa":
                asignarValores("¿cuantas hamburguesas desea ordenar? (stock maximo 200 hamburguesas)", 200, 6000)
                break
            case "pancho":
                asignarValores("¿cuantos panchos desea ordenar? (stock maximo 500 panchos)", 500, 3000)
                break; 
            case "fideos":
                asignarValores("¿cuantas fideos desea ordenar? (stock maximo 100 platos de fideos)", 100, 7500)
                break
            case "sushi":
                asignarValores("¿cuantos sushis desea ordenar? (stock maximo 100 sushis)", 100, 13000)
                break; 
            default:
                mensaje = "Usted eligio un numero o caracter equiocado, porfavor vuelva a seleccionar"
                maxCantidad = 0;
                precioUnitario = 0;
                break
        }
    }

document.getElementById("confirmarPedido").onclick = function() {
    let cantidad = parseInt(document.getElementById("cantidad").value)
    if (cantidad > 0 && cantidad <= maxCantidad) {
        let total = cantidad * precioUnitario
        pedidos.push({producto: productoSeleccionado, cantidad: cantidad, total: total})

        alert(`Muchas gracias, tu pedido de ${cantidad} ${productoSeleccionado}(s) ha sido realizado. Total: $${total}`)
    } else {
        alert(`No podemos procesar esa cantidad. Por favor, elige lo que dice la consigna`)
    }
    document.getElementById("detalle").style.display = "none"
    document.getElementById("menu").style.display = "block"
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