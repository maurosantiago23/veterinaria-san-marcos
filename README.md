# Veterinaria San Marcos 🐾

Sistema web de comercio y gestión para la **Veterinaria San Marcos**, desarrollado para la asignatura **DSY1104 - Desarrollo Fullstack II** (Duoc UC).

---

## 👥 Integrantes
* **Mauro Santiago**
* **Gabriel González**

---

## 📂 Organización del Repositorio

El repositorio está dividido en dos proyectos independientes correspondientes al avance de la asignatura:

```text
veterinaria-san-marcos/
├── README.md                 # Documentación general del repositorio
├── Vet_SanMarcos/            # UNIDAD 1: Sitio Web Estático (HTML5, CSS3, JS Vanilla, Bootstrap 5)
└── Vet_SanMarcos_React/      # UNIDAD 2: Aplicación SPA (React, Vite, React-Bootstrap, React Router)
```

---

## 📌 Unidad 1: Frontend Estático (`Vet_SanMarcos/`)

Proyecto presentado para la **Evaluación Parcial 1**. No requiere Node.js ni instalación de paquetes.

* **Tecnologías:** HTML5 semántico, CSS3, JavaScript Vanilla, Bootstrap 5, `localStorage`.
* **Funcionalidades:**
  * Catálogo de productos y servicios con filtros por categoría.
  * Vista de detalle de productos.
  * Carrito de compras con persistencia local (`localStorage`) y cálculo de IVA/total.
  * Formularios de contacto, inicio de sesión y registro con validación visual.
  * Panel administrativo con simulación de roles (Admin, Vendedor, Cliente).
* **Cómo ejecutarlo:**
  Abre una terminal en `Vet_SanMarcos` y corre:
  ```powershell
  python -m http.server 8081
  ```
  O ábrelo directamente con la extensión **Live Server** de VS Code sobre `Vet_SanMarcos/index.html`.

---

## ⚛️ Unidad 2: Aplicación React + Vite (`Vet_SanMarcos_React/`)

Migración y modernización del sistema hacia una aplicación web dinámica de una sola página (SPA).

* **Tecnologías:** React 19, Vite, React Router 7, Bootstrap 5 / React-Bootstrap.
* **Guía completa de trabajo:**
  👉 Consulta la guía detallada paso a paso en [Vet_SanMarcos_React/README.md](Vet_SanMarcos_React/README.md).
* **Resumen de inicio rápido en tu PC:**
  ```powershell
  cd Vet_SanMarcos_React
  npm install
  npm run dev
  ```
  Abre `http://localhost:5173/` en tu navegador para ver los cambios en tiempo real.

---

## ☁️ Despliegue en AWS Academy EC2

El proyecto incluye la configuración e instrucciones paso a paso para desplegar la aplicación en una instancia **EC2 (Amazon Linux 2023)** si el docente solicita su evaluación en la nube. Todas las instrucciones de AWS, llaves `.pem` y configuración de red están detalladas en [Vet_SanMarcos_React/README.md](Vet_SanMarcos_React/README.md#despliegue-en-aws-academy-ec2-evaluaci%C3%B3n-en-la-nube).

