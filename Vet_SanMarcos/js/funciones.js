// 1. Función para actualizar el contador del carrito en el navbar (se ejecuta en todas las páginas)
function actualizarContadorCarrito() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// 2. Función genérica para validar formato de correo electrónico institucional/personal
function validarCorreo(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com', '@duocuc.cl'];
    const esDominioValido = dominiosPermitidos.some(dom => email.endsWith(dom));
    return email !== '' && email.length <= 100 && esDominioValido;
}

// 3. Función para validar el RUN chileno (7 a 9 caracteres, sin puntos ni guion)
function validarRun(run) {
    const runLimpio = run.trim();
    return runLimpio.length >= 7 && runLimpio.length <= 9;
}

// 4. Función para validar longitud de contraseñas (4 a 10 caracteres)
function validarPassword(password) {
    return password.length >= 4 && password.length <= 10;
}

// Ejecutar actualizaciones automáticas al cargar cualquier documento HTML
document.addEventListener("DOMContentLoaded", function() {
    actualizarContadorCarrito();
});
