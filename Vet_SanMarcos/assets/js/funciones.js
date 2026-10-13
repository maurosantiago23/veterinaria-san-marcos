// Regiones y comunas usadas por el formulario de registro.
const regionesChile = {
    Metropolitana: ['Santiago', 'Maipú', 'Puente Alto', 'Las Condes'],
    Valparaiso: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'San Antonio'],
    O_Higgins: ['Rancagua', 'San Fernando', 'Rengo', 'Machalí']
};

// Carga las comunas correspondientes a la región seleccionada.
function cargarComunas() {
    const regionSelect = document.getElementById('select-region');
    const comunaSelect = document.getElementById('select-comuna');

    if (!regionSelect || !comunaSelect) {
        return;
    }

    comunaSelect.innerHTML = '<option value="">Seleccione una comuna...</option>';
    const comunas = regionesChile[regionSelect.value] || [];

    comunas.forEach(function(comuna) {
        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
    });
}

// 1. Actualiza el contador del carrito en el navbar.
function actualizarContadorCarrito() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Acepta cualquier dominio con formato de correo válido, no solo proveedores conocidos.
function validarCorreo(email) {
    const correo = email.trim();
    const partes = correo.split('@');

    if (correo.length > 100 || partes.length !== 2) {
        return false;
    }

    const [usuario, dominio] = partes;
    const etiquetasDominio = dominio.split('.');
    const usuarioValido = usuario !== '' && !usuario.startsWith('.') && !usuario.endsWith('.') && !usuario.includes('..') && /^[^\s@]+$/.test(usuario);
    const dominioValido = etiquetasDominio.length >= 2 && etiquetasDominio.every(etiqueta => /^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(etiqueta)) && etiquetasDominio[etiquetasDominio.length - 1].length >= 2;

    return usuarioValido && dominioValido;
}

// 3. Valida el largo del RUN solicitado por la pauta.
function validarRun(run) {
    const runLimpio = run.trim();
    return runLimpio.length >= 7 && runLimpio.length <= 9;
}

// 4. Valida la longitud de una contraseña.
function validarPassword(password) {
    return password.length >= 4 && password.length <= 10;
}

// Marca un campo inválido y escribe el mensaje en su contenedor dedicado.
function mostrarErrorCampo(campo, mensaje) {
    const error = obtenerContenedorError(campo);
    campo.classList.add('is-invalid');
    campo.setAttribute('aria-invalid', 'true');

    if (error) {
        error.classList.add('form-error', 'is-visible');
        error.setAttribute('role', 'alert');
        error.textContent = mensaje;
    }
}

// Limpia el estado visual de un campo antes de volver a validarlo.
function limpiarErrorCampo(campo) {
    const error = obtenerContenedorError(campo);
    campo.classList.remove('is-invalid');
    campo.removeAttribute('aria-invalid');

    if (error) {
        error.classList.remove('is-visible');
        error.textContent = '';
    }
}

function obtenerContenedorError(campo) {
    const grupo = campo.closest('.mb-3, .mb-4');
    return grupo ? grupo.querySelector('[id^="error-"]') : null;
}

function validarCampo(campo, condicion, mensaje) {
    limpiarErrorCampo(campo);

    if (!condicion) {
        mostrarErrorCampo(campo, mensaje);
        return false;
    }

    return true;
}

function validarFormularioRegistro() {
    const form = document.getElementById('form-registro');
    if (!form) {
        return true;
    }

    const run = document.getElementById('txt-run');
    const nombre = document.getElementById('txt-nombre');
    const email = document.getElementById('txt-email');
    const password = document.getElementById('txt-password');
    const region = document.getElementById('select-region');
    const comuna = document.getElementById('select-comuna');
    const direccion = document.getElementById('txt-direccion');

    let esValido = validarCampo(run, validarRun(run.value), 'El RUN debe tener entre 7 y 9 caracteres.');
    esValido = validarCampo(nombre, nombre.value.trim() !== '', 'El nombre completo es obligatorio.') && esValido;
    esValido = validarCampo(email, validarCorreo(email.value.trim()), 'Ingrese un correo válido y permitido.') && esValido;
    esValido = validarCampo(password, validarPassword(password.value), 'La contraseña debe tener entre 4 y 10 caracteres.') && esValido;
    esValido = validarCampo(region, region.value !== '', 'Debe seleccionar una región.') && esValido;

    if (comuna) {
        esValido = validarCampo(comuna, comuna.value !== '', 'Debe seleccionar una comuna.') && esValido;
    }

    esValido = validarCampo(direccion, direccion.value.trim() !== '', 'La dirección es obligatoria.') && esValido;
    return esValido;
}

function validarFormularioLogin() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    let esValido = validarCampo(email, validarCorreo(email.value.trim()), 'Ingrese un correo válido y permitido.');
    esValido = validarCampo(password, validarPassword(password.value), 'La contraseña debe tener entre 4 y 10 caracteres.') && esValido;
    return esValido;
}

function validarFormularioContacto() {
    const nombre = document.getElementById('contacto-nombre');
    const email = document.getElementById('contacto-email');
    const asunto = document.getElementById('contacto-asunto');
    const mensaje = document.getElementById('contacto-mensaje');
    let esValido = validarCampo(nombre, nombre.value.trim() !== '', 'El nombre es obligatorio.');
    esValido = validarCampo(email, validarCorreo(email.value.trim()), 'Ingrese un correo válido y permitido.') && esValido;
    esValido = validarCampo(asunto, asunto.value.trim() !== '', 'El asunto es obligatorio.') && esValido;
    esValido = validarCampo(mensaje, mensaje.value.trim() !== '', 'El mensaje no puede estar vacío.') && esValido;
    return esValido;
}

function validarFormularioProducto() {
    const codigo = document.getElementById('prod-codigo');
    const titulo = document.getElementById('prod-titulo');
    const categoria = document.getElementById('prod-categoria');
    const precio = document.getElementById('prod-precio');
    const stock = document.getElementById('prod-stock');
    let esValido = validarCampo(codigo, codigo.value.trim() !== '', 'El código del producto es obligatorio.');
    esValido = validarCampo(titulo, titulo.value.trim() !== '', 'El nombre del producto es obligatorio.') && esValido;
    esValido = validarCampo(categoria, categoria.value !== '', 'Debe seleccionar una categoría.') && esValido;
    esValido = validarCampo(precio, precio.value !== '' && Number(precio.value) >= 0, 'El precio debe ser mayor o igual a 0.') && esValido;
    esValido = validarCampo(stock, stock.value !== '' && Number(stock.value) >= 0, 'El stock debe ser mayor o igual a 0.') && esValido;
    return esValido;
}

function validarFormularioUsuarioAdmin() {
    const run = document.getElementById('admin-run');
    const nombre = document.getElementById('admin-nombre');
    const email = document.getElementById('admin-email');
    const password = document.getElementById('admin-password');
    const rol = document.getElementById('admin-rol');
    let esValido = validarCampo(run, validarRun(run.value), 'El RUN debe tener entre 7 y 9 caracteres.');
    esValido = validarCampo(nombre, nombre.value.trim() !== '', 'El nombre completo es obligatorio.') && esValido;
    esValido = validarCampo(email, validarCorreo(email.value.trim()), 'Ingrese un correo válido y permitido.') && esValido;
    esValido = validarCampo(password, validarPassword(password.value), 'La contraseña debe tener entre 4 y 10 caracteres.') && esValido;
    esValido = validarCampo(rol, rol.value !== '', 'Debe seleccionar un rol.') && esValido;
    return esValido;
}

function aplicarValidacionVisual(formulario, campos, validar) {
    if (!formulario) {
        return;
    }

    campos.forEach(function(campo) {
        if (!campo) {
            return;
        }

        const contenedorError = obtenerContenedorError(campo);
        if (contenedorError) {
            contenedorError.classList.add('form-error');
        }

        const validarCampoAlEditar = function() {
            campo.dataset.validacionIniciada = 'true';
            const valor = campo.value.trim();
            let esValido = true;
            let mensaje = '';

            if (campo.type === 'email') {
                esValido = validarCorreo(valor);
                mensaje = 'Usa el formato nombre@dominio.cl. Se aceptan dominios válidos de cualquier proveedor, como Gmail, Hotmail o Duoc.';
            } else if (campo.id.endsWith('run')) {
                esValido = validarRun(valor);
                mensaje = 'El RUN debe tener entre 7 y 9 caracteres.';
            } else if (campo.type === 'password') {
                esValido = validarPassword(campo.value);
                mensaje = 'La contraseña debe tener entre 4 y 10 caracteres.';
            } else if (campo.type === 'number') {
                const numero = Number(campo.value);
                esValido = campo.value !== '' && Number.isFinite(numero) && numero >= 0;
                if (campo.id === 'prod-stock') {
                    esValido = esValido && Number.isInteger(numero);
                }
                mensaje = campo.id === 'prod-stock'
                    ? 'El stock debe ser un número entero igual o mayor que 0.'
                    : 'Ingresa un número igual o mayor que 0.';
            } else if (campo.tagName === 'SELECT') {
                esValido = valor !== '';
                mensaje = 'Selecciona una opción para continuar.';
            } else {
                esValido = !campo.required || valor !== '';
                mensaje = 'Este campo es obligatorio.';
            }

            validarCampo(campo, esValido, mensaje);
        };

        campo.addEventListener('input', validarCampoAlEditar);
        campo.addEventListener('change', validarCampoAlEditar);
        campo.addEventListener('blur', function() {
            if (campo.value.trim() !== '' || campo.dataset.validacionIniciada === 'true') {
                validarCampoAlEditar();
            }
        });
    });

    formulario.addEventListener('submit', function(event) {
        campos.forEach(function(campo) {
            if (campo) {
                campo.dataset.validacionIniciada = 'true';
                limpiarErrorCampo(campo);
            }
        });

        if (!validar()) {
            event.preventDefault();
        }
    }, true);
}

// Ejecuta las mejoras compartidas cuando el documento termina de cargar.
document.addEventListener("DOMContentLoaded", function() {
    actualizarContadorCarrito();

    const regionSelect = document.getElementById('select-region');
    if (regionSelect) {
        regionSelect.addEventListener('change', cargarComunas);
    }

    aplicarValidacionVisual(document.getElementById('form-registro'), [
        document.getElementById('txt-run'),
        document.getElementById('txt-nombre'),
        document.getElementById('txt-email'),
        document.getElementById('txt-password'),
        document.getElementById('select-region'),
        document.getElementById('select-comuna'),
        document.getElementById('txt-direccion')
    ], validarFormularioRegistro);

    aplicarValidacionVisual(document.getElementById('form-login'), [
        document.getElementById('login-email'),
        document.getElementById('login-password')
    ], validarFormularioLogin);

    aplicarValidacionVisual(document.getElementById('form-contacto'), [
        document.getElementById('contacto-nombre'),
        document.getElementById('contacto-email'),
        document.getElementById('contacto-asunto'),
        document.getElementById('contacto-mensaje')
    ], validarFormularioContacto);

    aplicarValidacionVisual(document.getElementById('form-producto'), [
        document.getElementById('prod-codigo'),
        document.getElementById('prod-titulo'),
        document.getElementById('prod-categoria'),
        document.getElementById('prod-precio'),
        document.getElementById('prod-stock')
    ], validarFormularioProducto);

    aplicarValidacionVisual(document.getElementById('form-usuario-admin'), [
        document.getElementById('admin-run'),
        document.getElementById('admin-nombre'),
        document.getElementById('admin-email'),
        document.getElementById('admin-password'),
        document.getElementById('admin-rol')
    ], validarFormularioUsuarioAdmin);
});