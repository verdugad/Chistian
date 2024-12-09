// Cargar productos existentes al iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Simular carga de productos desde index.html
    cargarProductosExistentes();
});

function cargarProductosExistentes() {
    // Obtener todos los productos del index.html
    fetch('../index.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const productos = doc.querySelectorAll('.product');
            
            productos.forEach(producto => {
                const categoria = producto.getAttribute('data-category');
                const titulo = producto.querySelector('h2').textContent;
                const descripcion = producto.querySelector('p').textContent;
                const imagen = producto.querySelector('img').src;
                
                agregarProductoALista({
                    nombre: titulo,
                    descripcion: descripcion,
                    categoria: categoria,
                    imagen: imagen
                });
            });
        });
}

function agregarProductoALista(producto) {
    // Encontrar la sección correcta según la categoría
    const categoriaId = obtenerIdCategoria(producto.categoria);
    const seccionCategoria = document.querySelector(`#${categoriaId} .productos-grid`);
    
    if (!seccionCategoria) return;

    const productoCard = document.createElement('div');
    productoCard.className = 'producto-card';
    
    productoCard.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <button onclick="eliminarProducto(this)">Eliminar</button>
    `;
    
    seccionCategoria.appendChild(productoCard);
}

function obtenerIdCategoria(categoria) {
    const mapeoCategoria = {
        'cocina': 'cocinas',
        'neveras': 'neveras',
        'televisor': 'televisores',
        'lavadora': 'lavadoras',
        'vitrina': 'vitrinas'
    };
    return mapeoCategoria[categoria] || 'otros';
}

function eliminarProducto(button) {
    button.parentElement.remove();
}

// Manejar el formulario de nuevo producto
document.getElementById('productoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        imagen: document.getElementById('imagen').files[0] ? 
               URL.createObjectURL(document.getElementById('imagen').files[0]) : ''
    };

    agregarProductoALista(producto);
    this.reset();
});
