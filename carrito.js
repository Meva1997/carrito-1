
//variables 
const btnAdd = document.querySelectorAll('.add-to-cart');
const carritoTabla = document.querySelector('#cart-table tbody'); 
const totalPrecio = document.querySelector('#total-price'); 
const vaciarCarrito = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = []; 


//Event listeners 
btnAdd.forEach(boton => {
  boton.addEventListener('click', e => {
    const productoSeleccionado = e.target.parentElement; 
    leerDatosProducto(productoSeleccionado); 
  })
})

vaciarCarrito.addEventListener('click', (e) => {
  e.preventDefault(); 
  articulosCarrito = []; //resetear el arreglo 
  
  calcularTotal(); 
  
  limpiarCarrito(); //borramos el contenido del carrito 
})


//funciones principales 

//crear un objeto extrayendo la informacion del html 
function leerDatosProducto(producto){
  const infoProducto = {
    nombre: producto.querySelector('h3').textContent,
    precio: Number(producto.getAttribute('data-price')), //get attribute porque sacamos data-price del html y number para pasarlo de string a numero 
    id: producto.querySelector('button').textContent + producto.getAttribute('data-name'),
    cantidad: 1, 
  }
  
  verificarExiste(infoProducto); 
}



function verificarExiste(infoProducto){
  //iterar sobre el producto y regresa true o false si lo encuentra o no 
  const existe = articulosCarrito.some(producto => producto.id === infoProducto.id); 
  
  if(existe) {
    //si extiste actualiza la cantidad
    //map para buscar el producto
    articulosCarrito = articulosCarrito.map(producto => {
      if(producto.id === infoProducto.id){
        producto.cantidad++; 
        return producto; //producto actualizado 
      }
      return producto; //otros productos sin cambio 
    });
    
  } else {
    articulosCarrito = [...articulosCarrito, infoProducto];
  }
  
  actualizarCarrito(); 
}



function actualizarCarrito(){
  
  limpiarCarrito(); 
  
  //iterar sobre los productos que ya estan en el carrito
  articulosCarrito.forEach(producto => {
                           
    const fila = document.createElement('tr'); 
    
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.precio.toFixed(2)}</td>
      <td>${producto.cantidad}</td>
      <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
      <td><button class='btn-remove' data-id='${producto.id}'>X</button></td>
    `;
    
      carritoTabla.appendChild(fila); //agregar la nueva tabla html al <tbody> y carritoTabla esta en querySelector
  })
  
  eventoEliminar(); 
  
  calcularTotal(); 
}


function calcularTotal(){
  const total = articulosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); 
  totalPrecio.textContent = total.toFixed(2); 
}



//funciones de manipulacion de carrito 


// Asignar el evento de eliminación a los botones "X"
function eventoEliminar(){
document.querySelectorAll('.btn-remove').forEach(button => {
  button.addEventListener('click', eliminarProducto); 
  }); 
}


function eliminarProducto(e){
  const id = e.target.getAttribute('data-id'); 
  // Buscar el producto en el carrito
  const producto = articulosCarrito.find(producto => producto.id === id); 
  
  // Si la cantidad del producto es mayor a 1, reducirla
  if(producto.cantidad > 1){
    producto.cantidad--;
  } else {
    // Si la cantidad es 1, eliminarlo del carrito
    articulosCarrito = articulosCarrito.filter(producto => producto.id !== id);  
  }
  
  actualizarCarrito(); 
}



function limpiarCarrito(){
  while(carritoTabla.firstChild){
    carritoTabla.removeChild(carritoTabla.firstChild); 
  }
}