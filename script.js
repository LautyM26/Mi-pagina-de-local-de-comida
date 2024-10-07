alert("Bienvenidos a mi restaurante")

let nombre 
nombre = prompt("Ingrese su nombre")
alert("Hola " + nombre + ", a continuacion tendra su carta para hacer su pedido")

let opcion;
const pedidos = []

do {
    
    opcion = prompt("¿Que desea ordenar?\n 1: Pizzas\n 2: Hamburguesas\n 3: Panchos\n 4: Fideos\n 5: Sushi\n si quiere terminar su pedido pulse 0\n" )

   
    switch (opcion) {
        case "1":
            alert("El precio de cada pizza es de $8000")
            pizzas()
            break;

        case "2":
            alert("El precio de cada hamburguesa es de $6000")
            hamburguesas()
            break;

        case "3":
            alert("El precio de cada pancho es de $3000")
            panchos()
            break;  
             
        case "4":
            alert("El precio de cada plato de fideos es de $7500")
            fideos()
            break;
 
        case "5":
            alert("El precio de cada sushi es de $13000")
            sushi()
            break; 

        case "0":
            alert("Muchas Gracias")
            cuentaFinal()
            break;    

        default:
            alert("Usted eligio un numero o caracter equiocado, porfavor vuelva a seleccionar")
            break;
    }

} while (opcion !== "0");

let cantidad

function pizzas () {
    let cantidad = parseInt(prompt("¿cuantas pizzas desea ordenar?"))

    if (cantidad < 300) {
        alert("muchas gracias, su pedido ya ha sido realizado")
        let precioFinal = cantidad * 8000;
        alert("El precio final de las pizzas es: $" + precioFinal)
        pedidos.push ({producto: "pizza", cantidad: cantidad, total: precioFinal})
    } else {
        alert("No tenemos esa cantidad de comida, porfavor vuelve a realizar el pedido y elegir menos de 300 pizzas")
    }
        
}

function hamburguesas () {
    let cantidad = parseInt(prompt("¿cuantas hamburguesas desea ordenar?"))

    if (cantidad < 200) {
        alert("muchas gracias, su pedido ya ha sido realizado")
        let precioFinal = cantidad * 6000;
        alert("El precio final de las hamburguesas es: $" + precioFinal)
        pedidos.push ({producto: "hamburguesa", cantidad: cantidad, total: precioFinal})
    } else {
        alert("No tenemos esa cantidad de comida, porfavor vuelve a realizar el pedido y elegir menos de 200 hamburguesas")
    }
    
}

function panchos () {
    let cantidad = parseInt(prompt("¿cuantos panchos desea ordenar?"))

    if (cantidad < 500) {
        alert("muchas gracias, su pedido ya ha sido realizado")
        let precioFinal = cantidad * 3000;
        alert("El precio final de los panchos es: $" + precioFinal)
        pedidos.push ({producto: "pancho", cantidad: cantidad, total: precioFinal})
    } else {
        alert("No tenemos esa cantidad de comida, porfavor vuelve a realizar el pedido y elegir menos de 500 panchos")
    }
    
}

function fideos () {
    let cantidad = parseInt(prompt("¿cuantas fideos desea ordenar?"))

    if (cantidad < 100) {
        alert("muchas gracias, su pedido ya ha sido realizado")
        let precioFinal = cantidad * 7500;
        alert("El precio final de los platos de fideos es: $" + precioFinal)
        pedidos.push ({producto: "fideos", cantidad: cantidad, total: precioFinal})
    } else {
        alert("No tenemos esa cantidad de comida, porfavor vuelve a realizar el pedido y elegir menos de 100 platos de fideos")
    }
    
}

function sushi () {
    let cantidad = parseInt(prompt("¿cuantas sushis desea ordenar?"))

    if (cantidad < 100) {
        alert("muchas gracias, su pedido ya ha sido realizado")
        let precioFinal = cantidad * 13000;
        alert("El precio final de las tablas de sushi es: $" + precioFinal)
        pedidos.push ({producto: "sushi", cantidad: cantidad, total: precioFinal})
    } else {
        alert("No tenemos esa cantidad de comida, porfavor vuelve a realizar el pedido y elegir menos de 100 platos de sushis")
    }
}

function cuentaFinal() {
    if (pedidos.lenght === 0) {
        alert("Aun no se ha realizado ningun pedido")
    } else {
        let mensaje = "Resumen final de su pedido:\n"
        let totalGeneral = 0

        for (let i = 0; i < pedidos.length; i++) {
            totalGeneral = totalGeneral + pedidos[i].total
        }

        mensaje = mensaje + "Total a pagar: $" + totalGeneral
        alert(mensaje)
    }
}