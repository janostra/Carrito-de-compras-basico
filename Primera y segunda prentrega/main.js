function Product (name, price){
    this.nombre = name;
    this.precio = price;
    this.addToCart = function() {
        alert(`Producto agregado al carrito: ${this.nombre}, Precio: ${this.precio}`);
        console.log(`Producto agregado al carrito: ${this.nombre}, Precio: ${this.precio}`);
        console.log("La cantidad de productos en el carrito es de " + i);
    };
}

function obtenerProductosPorPrecio(products, precioMinimo) {
    return products.filter(function(producto) {
        return producto.precio > precioMinimo;
    });
}

var total = 0;

function totalprice (price, total){
    total += price
    return total
}

var i = 0

var array = [];

let answer =  prompt ("¿Desea cargar algun producto al carrito? si/no");

while (answer != "no") {
    if (answer == "si") {
        let name = prompt ("Ingrese el nombre del producto");
        var price = parseInt(prompt ("Ingrese el precio del producto"));
        if ((typeof name === 'string') && !isNaN(price)){
            let producto = new Product (name, price);
            array.push(producto);
            console.log(array)
            i++;
            producto.addToCart();
            total = totalprice (price, total);
            alert ("El carrito suma un total de " + total);
            answer = prompt ("¿Desea cargar otro producto al carrito? si/no");
        } else if ((typeof name !== "string") || isNaN(Number(price))) {
            alert("Uno o ambos de los datos ingresados no son del tipo correcto. Por favor inténtalo de nuevo.");
        }
    } else if (answer == null) {
        alert ("Ingrese una opcion");
        answer = prompt ("¿Desea cargar un producto al carrito? si/no");
    } else {
        alert ("La respuesta introducida no es correcta");
        answer = prompt ("¿Desea cargar un producto al carrito? si/no");
    }
}

ans = prompt("¿Desea quitar de su carrito productos con un precio minimo?");
if (ans == "si") {
    precioMinimo = prompt("Ingrese un valor minimo para quitar los productos dentro de su carrito con precio inferior a ese valor");
    newcarrito = obtenerProductosPorPrecio(array, precioMinimo);
    console.log (newcarrito);
    var x = newcarrito.length;
    alert("La cantidad de productos en el carrito es de " + x);
} else if (ans = "no") {
    alert ("Usted no modificó su carrito");
    alert("La cantidad de productos en el carrito es de " + i);
} else {
    alert ("Respuesta incorrecta");
}

alert ("Gracias por su visita!");