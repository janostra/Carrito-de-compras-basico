function product (name, price){
    alert ("Se agregó al carrito el producto " + name + " de precio " + price);
    console.log ("Se agregó al carrito el producto " + name + " de precio " + price)
    console.log("La cantidad de productos comprados es de " + i);
}

var total = 0;

function totalprice (price, total){
    total += price
    return total
}

var i = 0

let answer = prompt ("¿Desea cargar algun producto al carrito? si/no");

while (answer != "no") {
    if (answer == "si") {
        let name = prompt ("Ingrese el nombre del producto");
        var price = parseInt(prompt ("Ingrese el precio del producto"));
        i++;
        product (name, price);
        total = totalprice (price, total);
        alert ("El carrito suma un total de " + total);
        answer = prompt ("¿Desea cargar otro producto al carrito? si/no");
    } else if (answer == null) {
        alert ("Ingrese una opcion");
        answer = prompt ("¿Desea cargar un producto al carrito? si/no");
    } else {
        alert ("La respuesta introducida no es correcta");
        answer = prompt ("¿Desea cargar un producto al carrito? si/no");
    }
}
alert ("Gracias por su visita!");