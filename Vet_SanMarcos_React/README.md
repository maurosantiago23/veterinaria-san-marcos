# Veterinaria San Marcos React

Punto de partida de la Unidad 2. Esta aplicación se mantiene separada de `Vet_SanMarcos`, que contiene la versión HTML, CSS y JavaScript presentada en la Unidad 1.

## Requisitos

- Node.js instalado.
- npm, incluido con Node.js.

Comprueba la instalación desde una terminal:

```powershell
node --version
npm --version
```

## Instalar y ejecutar

Desde la carpeta raíz del repositorio:

```powershell
cd Vet_SanMarcos_React
npm install
npm run dev
```

Abre en el navegador la dirección que indique Vite, normalmente `http://localhost:5173/`.

## Comandos disponibles

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

- `dev`: inicia el servidor de desarrollo con recarga automática.
- `build`: genera la versión de producción en `dist/`.
- `lint`: revisa el código con Oxlint.
- `preview`: sirve localmente la última compilación.

## Estructura inicial

```text
Vet_SanMarcos_React/
├── public/images/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Qué incluye esta base

- Rutas para Inicio, Productos y Login con React Router.
- Un Navbar compartido que usa enlaces de React Router.
- Un componente `Producto` reutilizado para mostrar ejemplos estáticos.
- Bootstrap 5 disponible mediante sus clases CSS; React-Bootstrap está instalado para seguir las prácticas de la unidad cuando se introduzca en clases.

Los productos y la página de Login son solo una estructura inicial. Todavía no implementan carrito, autenticación ni backend.