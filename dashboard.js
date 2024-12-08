function agregarProducto() {
    const nombreProducto = document.getElementById('producto-nombre').value;
    const categoria = document.getElementById('producto-categoria').value;
    const descripcion = document.getElementById('producto-descripcion').value;
    
    // Aquí podrías agregar la lógica para almacenar estos datos en una base de datos o local storage.
    
    alert('Producto agregado: ' + nombreProducto);
}
