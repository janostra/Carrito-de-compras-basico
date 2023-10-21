document.addEventListener('DOMContentLoaded', function() {
    const listaCarrito = document.getElementById('lista-carrito');
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const total = document.getElementById('total');
    const comprar = document.getElementById('comprar');

    document.getElementById('irAFavoritos').addEventListener('click', function() {
        window.location.href = './favoritos.html';
    });
    
    document.getElementById('irACompras').addEventListener('click', function() {
        window.location.href = '/index.html';
    });

    function quitarDelCarrito(producto) {
        carrito = carrito.filter(item => item.nombre !== producto.nombre);
        actualizarCarrito();
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function actualizarCarrito() {
        listaCarrito.innerHTML = '';
        let totalCarrito = 0;
    
        carrito.forEach((producto, index) => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('tarjeta');
    
            const imagen = document.createElement('img');
            imagen.src = `../assets/images/pokemon/${producto.nombre}.png`;
            imagen.alt = producto.nombre;
    
            const nombre = document.createElement('h3');
            nombre.textContent = producto.nombre;
    
            const precio = document.createElement('p');
            precio.textContent = `$${producto.precio}`;
    
            const cantidad = document.createElement('p');
            cantidad.textContent = `Cantidad: ${producto.cantidad}`;
    
            const quitarBtn = document.createElement('button');
            quitarBtn.textContent = `Quitar del Carrito`;
            quitarBtn.classList.add('quitar');
            quitarBtn.addEventListener('click', function() {
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                } else {
                    quitarDelCarrito(producto)
                }
    
                actualizarCarrito();
                sessionStorage.setItem('carrito', JSON.stringify(carrito));
            });
    
            divProducto.appendChild(imagen);
            divProducto.appendChild(nombre);
            divProducto.appendChild(precio);
            divProducto.appendChild(cantidad);
            divProducto.appendChild(quitarBtn);
    
            listaCarrito.appendChild(divProducto);
    
            totalCarrito += producto.precio * producto.cantidad;
        });
    
        total.textContent = `Total: $${totalCarrito}`;
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }

    comprar.addEventListener('click', function() {
        Swal.fire({
            icon: 'info',
            title: '¡Compra realizada!',
            text: '¡Gracias por tu compra!',
            confirmButtonText: 'Aceptar'
        });
    });

    actualizarCarrito();

})