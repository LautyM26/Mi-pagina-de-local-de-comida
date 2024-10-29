let nombre
let pedidos = []
let productoSeleccionado

document.addEventListener("DOMContentLoaded", function () {
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

})


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
    document.getElementById("menu").style.display = "none"
    document.getElementById("detalle").style.display = "block"

    let mensaje = ""
    let maxCantidad = 0
    let precioUnitario = 0

    function pizzas () {
        mensaje = "¿cuantas pizzas desea ordenar? (stock maximo 300 pizzas)" 
        maxCantidad = 300
        precioUnitario = 8000
     }
    
    function hamburguesas () {
        mensaje = "¿cuantas hamburguesas desea ordenar? (stock maximo 200 hamburguesas)"
        maxCantidad = 200
        precioUnitario = 6000
     }
    
    function panchos () {
        mensaje = "¿cuantos panchos desea ordenar? (stock maximo 500 panchos)"
        maxCantidad = 500
        precioUnitario = 3000
     }
    
    function fideos () {
        mensaje = "¿cuantas fideos desea ordenar? (stock maximo 100 platos de fideos)"
        maxCantidad = 100
        precioUnitario = 7500
     }
    
    function sushi () {
        mensaje = "¿cuantos sushis desea ordenar? (stock maximo 100 sushis)"
        maxCantidad = 100
        precioUnitario = 13000
     }
    
    switch (producto) {
    case "pizza":
        pizzas()
        break
    case "hamburguesa":
        hamburguesas()
        break
    case "pancho":
        panchos()
        break; 
    case "fideos":
        fideos()
        break
    case "sushi":
        sushi()
        break; 
    default:
        mensaje = "Usted eligio un numero o caracter equiocado, porfavor vuelva a seleccionar"
        break
    }

    document.getElementById("mensaje").innerText = mensaje
    
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
    resumenContainer.style = "block"
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