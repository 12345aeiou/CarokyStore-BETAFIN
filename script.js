// 1. DATA DE PRODUCTOS
const productosData = [
    {
        id: 1,
        nombre: "Pack de Mascarillas Coreanas",
        precioMenor: 15.00,
        precioMayor: 12.00,
        imagenes: [
            "imagenes/ID1.webp", // Reemplazar con tus rutas
            "imagenes/ID11.9ocfu0-1737945964777",
            "imagenes/ID111.jpg"
        ]
    },
    {
        id: 2,
        nombre: "Crema Hidratante de Noche",
        precioMenor: 35.00,
        precioMayor: 30.00,
        imagenes: [
            "img/producto2-1.jpg",
            "img/producto2-2.jpg",
            "img/producto2-3.jpg"
        ]
    },
    {
        id: 3,
        nombre: "Set de Brochas de Maquillaje",
        precioMenor: 50.00,
        precioMayor: 45.00,
        imagenes: [
            "img/producto3-1.jpg",
            "img/producto3-2.jpg",
            "img/producto3-3.jpg"
        ]
    }
    
    // Añade más productos aquí
];

const productosContainer = document.getElementById('productosContainer');
const currentImageIndex = {}; // Objeto para seguir el índice de la imagen de cada producto

// --- 2. FUNCIONALIDAD DE MENÚ HAMBURGUESA ---
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Toggle (Alternar) el menú al hacer clic en la hamburguesa
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar el menú después de hacer clic en un enlace (en móvil)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Solo cerramos si el menú está activo
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
});
// ---------------------------------------------------


// --- 3. FUNCIÓN PARA GENERAR EL HTML DEL PRODUCTO ---
function crearTarjetaProducto(producto) {
    // El número de WhatsApp debe ser +51934733462 (se asume que es Perú, +51)
    const whatsappMsg = `Hola%20deseo%20informacion%20del%20producto%20(${producto.nombre})`;
    const whatsappLink = `https://wa.me/51934733462?text=${whatsappMsg}`;

    return `
        <div class="producto-card" data-nombre="${producto.nombre.toLowerCase()}">
            <div class="carrusel-container">
                <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="carrusel-img" id="img-${producto.id}">
                <button class="carrusel-btn prev" onclick="cambiarImagen(${producto.id}, -1)">&#10094;</button>
                <button class="carrusel-btn next" onclick="cambiarImagen(${producto.id}, 1)">&#10095;</button>
            </div>

            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <div class="precio">
                    <span>Precio x Menor: <span class="menor">S/. ${producto.precioMenor.toFixed(2)}</span></span>
                    <span>Precio x Mayor (3+ ud): <span class="mayor">S/. ${producto.precioMayor.toFixed(2)}</span></span>
                </div>
                <a href="${whatsappLink}" target="_blank" class="consultar-btn">
                    Consultar Producto
                </a>
            </div>
        </div>
    `;
}

// --- 4. FUNCIONALIDAD DEL CARRUSEL DE IMÁGENES ---
/**
 * Cambia la imagen visible del producto.
 * @param {number} id - ID del producto.
 * @param {number} direccion - 1 para siguiente, -1 para anterior.
 */
function cambiarImagen(id, direccion) {
    const producto = productosData.find(p => p.id === id);
    if (!producto) return;

    if (currentImageIndex[id] === undefined) {
        currentImageIndex[id] = 0;
    }

    let nuevoIndice = currentImageIndex[id] + direccion;
    const totalImagenes = producto.imagenes.length;

    // Lógica para que el carrusel sea cíclico
    if (nuevoIndice >= totalImagenes) {
        nuevoIndice = 0;
    } else if (nuevoIndice < 0) {
        nuevoIndice = totalImagenes - 1;
    }

    currentImageIndex[id] = nuevoIndice;

    // Actualizar el atributo 'src' de la imagen en el DOM
    document.getElementById(`img-${id}`).src = producto.imagenes[nuevoIndice];
}

// --- 5. FUNCIÓN DEL BUSCADOR ---
function buscarProductos() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const productos = document.querySelectorAll('.producto-card');

    productos.forEach(card => {
        const nombreProducto = card.getAttribute('data-nombre');

        if (nombreProducto.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


// --- 6. INICIALIZACIÓN ---
// Cargar todos los productos al inicio
window.onload = function() {
    let htmlContent = '';
    productosData.forEach(producto => {
        // Inicializar el índice de imagen
        currentImageIndex[producto.id] = 0;
        // Generar el HTML
        htmlContent += crearTarjetaProducto(producto);
    });
    productosContainer.innerHTML = htmlContent;
};