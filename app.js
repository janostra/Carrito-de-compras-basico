document.addEventListener('DOMContentLoaded', async function() {
    const productosContainer = document.getElementById('productos');


    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    try {
        const response = await fetch('./pokemon.json');
        const data = await response.json();
        mostrarProductos(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    document.getElementById('irAFavoritos').addEventListener('click', function() {
        window.location.href = './pages/favoritos.html';
    });
    
    document.getElementById('irACarrito').addEventListener('click', function() {
        window.location.href = './pages/carrito.html';
    });

    function mostrarProductos(productos) {
        productos.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');

            const imagen = document.createElement('img');
            imagen.src = `./assets/images/pokemon/${producto.imagen}`;
            imagen.alt = producto.nombre;

            const nombre = document.createElement('h3');
            nombre.textContent = producto.nombre;

            const id = document.createElement('p');
            id.textContent = `ID: ${producto.id}`;

            const descripcion = document.createElement('p');
            descripcion.textContent = producto.descripcion;
            descripcion.classList.add('descrip');

            const precio = document.createElement('p');
            precio.textContent = `$${producto.id + 50}`;

            const botonAgregarCarrito = document.createElement('button');
            botonAgregarCarrito.textContent = 'Agregar al Carrito';
            botonAgregarCarrito.classList.add('btncarrito');
            botonAgregarCarrito.addEventListener('click', function() {
                agregarAlCarrito({
                    nombre: producto.nombre,
                    precio: 50 + producto.id,
                    cantidad: 1
                });
            });

            const botonAgregarFavorito = document.createElement('button');
            botonAgregarFavorito.textContent = 'Agregar a Favoritos';
            botonAgregarFavorito.classList.add('btnfavorito');
            botonAgregarFavorito.addEventListener('click', function() {
                agregarAFavoritos({
                    nombre: producto.nombre,
                    precio: 50 + producto.id,
                    cantidad: 1
                });
            });

            divProducto.appendChild(imagen);
            divProducto.appendChild(nombre);
            divProducto.appendChild(id);
            divProducto.appendChild(descripcion);
            divProducto.appendChild(precio);
            divProducto.appendChild(botonAgregarCarrito);
            divProducto.appendChild(botonAgregarFavorito);

            productosContainer.appendChild(divProducto);
        });
    }

    function agregarAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push(producto);
        }
    
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAFavoritos(producto) {
        const yaEnFavoritos = favoritos.some(item => item.nombre === producto.nombre);

        if (!yaEnFavoritos) {
            favoritos.push(producto);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
    }

});
