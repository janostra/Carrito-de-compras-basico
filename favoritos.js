document.addEventListener('DOMContentLoaded', function() {
    const listaFavoritos = document.getElementById('lista-favoritos');
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    document.getElementById('irACompras').addEventListener('click', function() {
        window.location.href = '/index.html';
    });
    
    document.getElementById('irACarrito').addEventListener('click', function() {
        window.location.href = './carrito.html';
    });

    function mostrarFavoritos() {
        console.log("entrando a mostrarfavoritos")
        listaFavoritos.innerHTML = '';

        favoritos.forEach((producto, index) => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('tarjeta');

            const imagen = document.createElement('img');
            imagen.src = `../assets/images/pokemon/${producto.nombre}.png`;
            imagen.alt = producto.nombre;

            const nombre = document.createElement('h3');
            nombre.textContent = producto.nombre;

            const precio = document.createElement('p');
            precio.textContent = `$${producto.precio}`;

            const quitarFavoritoBtn = document.createElement('button');
            quitarFavoritoBtn.textContent = 'Quitar de Favoritos';
            quitarFavoritoBtn.classList.add('quitar');
            quitarFavoritoBtn.addEventListener('click', function() {
                quitarDeFavoritos(producto);
            });

            const agregarCarritoBtn = document.createElement('button');
            agregarCarritoBtn.textContent = 'Agregar al Carrito';
            agregarCarritoBtn.addEventListener('click', function() {
                agregarAlCarrito({
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: 1
                });
            });

            divProducto.appendChild(imagen);
            divProducto.appendChild(nombre);
            divProducto.appendChild(precio);
            divProducto.appendChild(quitarFavoritoBtn);
            divProducto.appendChild(agregarCarritoBtn);

            listaFavoritos.appendChild(divProducto);
        });
    }

    function quitarDeFavoritos(producto) {
        favoritos = favoritos.filter(item => item.nombre !== producto.nombre);
        mostrarFavoritos();
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    function agregarAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push(producto);
        }
    
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        
        Swal.fire({
            icon: 'success',
            title: '¡Añadido al carrito!',
            text: `${producto.nombre} se ha añadido al carrito.`,
        });
    }

    mostrarFavoritos();
});
