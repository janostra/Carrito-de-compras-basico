document.addEventListener('DOMContentLoaded', function() {
    //Aquí estamos declarando algunas variables y obteniendo elementos del DOM por sus IDs. 
    //Esto nos permitirá interactuar con ellos más adelante en el código.
        const formProducto = document.getElementById('formProducto');
        const agregarFavorito = document.getElementById('agregarFavorito');
        const listaCarrito = document.getElementById('lista-carrito');
        const listaFavoritos = document.getElementById('lista-favoritos');
        const total = document.getElementById('total');
        const comprarBtn = document.getElementById('comprar');
        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
        formProducto.addEventListener('submit', function(e) {
            e.preventDefault();
    
            const nombre = document.getElementById('nombre').value;
            const precio = parseFloat(document.getElementById('precio').value);
    
            if (nombre && !isNaN(precio)) {
                const nuevoProducto = {
                    nombre: nombre,
                    precio: precio
                };
    
                carrito.push(nuevoProducto);
    
                actualizarCarrito();
            }
        });
    
        agregarFavorito.addEventListener('click', function() {
            const nombre = document.getElementById('nombre').value;
            const precio = parseFloat(document.getElementById('precio').value);
    
            if (nombre && !isNaN(precio)) {
                const nuevoProducto = {
                    nombre: nombre,
                    precio: precio
                };
    
                favoritos.push(nuevoProducto);
    
                actualizarFavoritos();
            }
        });
    
        function actualizarCarrito() {
            listaCarrito.innerHTML = '';
            let totalCarrito = 0;
    
            carrito.forEach((producto, index) => {
                const li = document.createElement('li');
                li.textContent = `${producto.nombre} - $${producto.precio}`;
    
                const quitarBtn = document.createElement('button');
                quitarBtn.textContent = 'Quitar de Carrito';
                quitarBtn.classList.add('quitar');
                quitarBtn.addEventListener('click', function() {
                    carrito.splice(index, 1);
                    actualizarCarrito();
                    sessionStorage.setItem('carrito', JSON.stringify(carrito));
                });
    
                li.appendChild(quitarBtn);
                listaCarrito.appendChild(li);
                totalCarrito += producto.precio;
            });
    
            total.textContent = totalCarrito;
            sessionStorage.setItem('carrito', JSON.stringify(carrito)); // Se actualiza aquí
        }
    
        function actualizarFavoritos() {
            listaFavoritos.innerHTML = '';
    
            favoritos.forEach((producto, index) => {
                const li = document.createElement('li');
                li.textContent = `${producto.nombre} - $${producto.precio}`;
    
                const quitarFavoritoBtn = document.createElement('button');
                quitarFavoritoBtn.textContent = 'Quitar de Favoritos';
                quitarFavoritoBtn.classList.add('quitar');
                quitarFavoritoBtn.addEventListener('click', function() {
                    favoritos.splice(index, 1);
                    actualizarFavoritos();
                    localStorage.setItem('favoritos', JSON.stringify(favoritos));
                });
    
                const agregarCarritoBtn = document.createElement('button');
                agregarCarritoBtn.textContent = 'Añadir al Carrito';
                agregarCarritoBtn.addEventListener('click', function() {
                    carrito.push(producto);
                    actualizarCarrito();
                    favoritos = favoritos.filter(item => item !== producto);
                    actualizarFavoritos();
                    localStorage.setItem('favoritos', JSON.stringify(favoritos));
                    sessionStorage.setItem('carrito', JSON.stringify(carrito));
                });
    
                li.appendChild(quitarFavoritoBtn);
                li.appendChild(agregarCarritoBtn);
                listaFavoritos.appendChild(li);
            });
    
            localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Se actualiza aquí
        }
    
        comprarBtn.addEventListener('click', function() {
            // No hace nada por ahora, puedes agregar la lógica de compra aquí.
            // Puedes mostrar un mensaje de confirmación o redirigir a una página de compra.
        });
    
        actualizarCarrito();
        actualizarFavoritos();
    });
    