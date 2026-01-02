let productos = [];
let carrito = [];

fetch("./data/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos();
    });

function mostrarProductos() {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = "producto";

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button data-id="${producto.id}">Agregar</button>
        `;

        contenedor.appendChild(div);
    });
}

document.getElementById("productos").addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const id = Number(e.target.dataset.id);
        agregarAlCarrito(id);
    }
});

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    guardarCarrito();
    Toastify({
        text: `${producto.nombre} agregado al carrito`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#000"
    }).showToast();
    renderCarrito();
}

function renderCarrito() {
    const contenedor = document.getElementById("itemsCarrito");
    contenedor.innerHTML = "";

    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            ${item.nombre} - $${item.precio}
            <button data-index="${index}">X</button>
        `;
        contenedor.appendChild(div);
    });

    calcularTotal();
}

document.getElementById("itemsCarrito").addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const index = Number(e.target.dataset.index);
        carrito.splice(index, 1);
        renderCarrito();
    }
});

function calcularTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    document.getElementById("total").textContent = `Total: $${total}`;
}

document.getElementById("comprar").addEventListener("click", () => {
    if (carrito.length === 0) return;

    carrito = [];
    renderCarrito();
    document.getElementById("total").textContent = "Compra realizada";
});
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        renderCarrito();
    }
}

cargarCarrito();
