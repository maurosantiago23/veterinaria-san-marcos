# Veterinaria San Marcos

Sistema web frontend de comercio y gestión para la **Veterinaria San Marcos**, desarrollado para la asignatura **DSY1104 - Desarrollo Fullstack II**, Evaluación Parcial 1.

## Descripción

El proyecto presenta una tienda online de productos y servicios veterinarios, junto con un panel administrativo para gestionar productos y usuarios. La aplicación utiliza HTML5 semántico, CSS3, Bootstrap y JavaScript nativo.

## Funcionalidades

- Página de inicio con información de la veterinaria.
- Catálogo de productos y servicios.
- Filtros por categoría.
- Vista de detalle de productos.
- Carrito de compras con `localStorage`.
- Cálculo de subtotal, IVA y total.
- Formularios de registro, inicio de sesión y contacto.
- Validación visual de formularios.
- Carga dinámica de comunas según la región seleccionada.
- Blog con artículos de cuidado animal.
- Panel administrativo para productos y usuarios.
- Roles simulados: Administrador, Vendedor y Cliente.
- Diseño responsive para computador y dispositivos móviles.
- Video embebido de YouTube en la página de inicio.

## Tecnologías

- HTML5
- CSS3
- JavaScript Vanilla
- Bootstrap 5
- `localStorage`

## Estructura del proyecto

```text
veterinaria-san-marcos/
├── README.md
└── Vet_SanMarcos/
	├── index.html
	├── productos.html
	├── detalle-producto.html
	├── carrito.html
	├── blogs.html
	├── blog-detalle-1.html
	├── blog-detalle-2.html
	├── contacto.html
	├── nosotros.html
	├── login.html
	├── registro.html
	├── admin-home.html
	├── admin-productos.html
	├── admin-producto-form.html
	├── admin-usuarios.html
	├── admin-usuario-form.html
	├── images/
	└── assets/
		├── css/estilos.css
		└── js/funciones.js
```

## Ejecución local

El proyecto es estático y no necesita instalación de dependencias. Para ejecutarlo correctamente, abre una terminal dentro de la carpeta `Vet_SanMarcos` y ejecuta:

```powershell
python -m http.server 8081
```

Luego abre en el navegador:

```text
http://localhost:8081/index.html
```

También se puede utilizar la extensión **Live Server** de VS Code.

Para detener el servidor en la terminal, presiona `Ctrl + C`.

## Datos de prueba

Para revisar el carrito:

1. Ingresa a `productos.html`.
2. Selecciona un producto.
3. Añade una cantidad al carrito.
4. Abre `carrito.html`.
5. Verifica las cantidades y el total.

Para probar la redirección simulada del login, utiliza un correo que contenga `admin` o `profesor`.

## Consideraciones

- El inicio de sesión y el control de roles son simulaciones frontend.
- No existe una base de datos ni un backend conectado.
- Los datos del carrito se almacenan temporalmente en el navegador mediante `localStorage`.
- Para una aplicación real, la autenticación y los permisos deberían validarse en un servidor.

## Integrantes

- Mauro Santiago
- Gabriel González

## Asignatura

**DSY1104 - Desarrollo Fullstack II**

Duoc UC
