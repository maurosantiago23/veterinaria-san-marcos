# Veterinaria San Marcos 🐾
**Plataforma Web Fullstack: Comercio Electrónico y Gestión Clínica Veterinaria**  
* **Asignatura:** DSY1104 - Desarrollo Fullstack II  
* **Institución:** Duoc UC - Escuela de Informática y Telecomunicaciones  
* **Evaluación:** Evaluación Parcial 3 (40%)  
* **Autores:** Mauro Santiago & Gabriel González  
* **Docente:** Hernán  
* **Rama oficial de entrega:** `evaluacion-3`  

---

## 📌 1. Descripción del Proyecto

**Veterinaria San Marcos** es una solución web empresarial Fullstack desarrollada bajo una arquitectura desacoplada y orientada a servicios en la nube. Permite la comercialización de insumos clínicos, alimentos para mascotas y el agendamiento y facturación de servicios médicos veterinarios con distinción de cupos diarios.

### Arquitectura Tecnológica en la Nube
* **Frontend:** Single Page Application (SPA) desarrollada en **React 19** con **Vite**, gestionando estado global mediante Context API (`AuthContext`, `CartContext`), persistencia de sesión segura en `localStorage` (Anti-F5) y control de acceso basado en roles (RBAC).
* **Backend:** API REST modular desarrollada en **Spring Boot 4.1.2** sobre **Java 21 LTS**, estructurada en microservicios desacoplados (Productos, Usuarios y Ventas) con transacciones atómicas (`@Transactional`), seguridad stateless con tokens **JWT (HMAC-SHA256)** y documentación interactiva en **OpenAPI 3 / Swagger**.
* **Base de Datos:** **Oracle Autonomous Database (ATP 19c)** en Oracle Cloud Infrastructure (OCI - región `sa-valparaiso-1`), modelada estrictamente en **Tercera Forma Normal (3FN)** con conexión cifrada mediante **mTLS y Oracle Wallet**.
* **Infraestructura Cloud:** Desplegada en una instancia **AWS EC2 (`t3.medium`)** ejecutando Amazon Linux 2023.

---

## 📂 2. Estructura del Repositorio (Rama `evaluacion-3`)

```text
veterinaria-san-marcos/
├── Vet_SanMarcos_React/          # Proyecto Frontend (React 19 + Vite)
│   ├── src/
│   │   ├── components/           # Componentes UI reutilizables (Navbar, Producto, etc.)
│   │   ├── context/              # Contextos globales (AuthContext con JWT, CartContext)
│   │   ├── pages/                # Vistas principales (Inicio, Productos, Carrito, Login, Admin)
│   │   ├── services/             # Cliente HTTP centralizado (api.js con detección de host)
│   │   └── setupTests.js         # Configuración del entorno de pruebas unitarias
│   ├── package.json              # Dependencias y scripts de Vite / Vitest
│   └── vite.config.js
│
├── vet-sanmarcos-backend/        # Proyecto Backend (Spring Boot 4 + Java 21)
│   ├── src/main/java/cl/duoc/vet_sanmarcos_backend/
│   │   ├── config/               # Seguridad Spring Security, CORS y PasswordEncoder
│   │   ├── productos/            # Microservicio de Catálogo e Inventario (/api/v1/productos)
│   │   ├── usuarios/             # Microservicio de Usuarios y Auth JWT (/api/v1/auth)
│   │   └── ventas/               # Microservicio de Ventas y Boletas (/api/v1/boletas)
│   ├── src/main/resources/       # application.properties (Conexión Oracle ATP)
│   └── pom.xml                   # Dependencias Maven (JPA, Security, JJWT, Springdoc)
│
├── .gitignore                    # Reglas de exclusión para Git (node_modules, target, etc.)
└── README.md                     # Documentación oficial del repositorio
```

---

## ☁️ 3. Accesos y Despliegue en la Nube (AWS EC2)

> **Nota sobre la IP pública dinámica:**  
> Al tratarse de una instancia educativa sin IP elástica asignada, AWS asigna una dirección IPv4 pública cada vez que la máquina virtual se enciende.
> * **Frontend React (Tienda Web):** `http://<IP_PUBLICA_EC2>:5173`
> * **Swagger UI Interactivo (API REST):** `http://<IP_PUBLICA_EC2>:8080/swagger-ui/index.html`

---

## 🔐 4. Matriz de Roles y Credenciales de Demostración

El sistema valida perfiles de usuario mediante roles en el token JWT (`ADMIN`, `VENDEDOR`, `CLIENTE`):

| Rol | Correo Electrónico | Contraseña | Permisos y Capacidades |
| :--- | :--- | :---: | :--- |
| **ADMINISTRADOR** | `admin@veterinaria.cl` | `1234` | Acceso total: gestión y alteración de stock/cupos, panel administrativo y supervisión de boletas. |
| **VENDEDOR** | `vendedor@veterinaria.cl` | `1234` | Consulta de catálogo y visualización del historial de órdenes emitidas para despacho/atención. |
| **CLIENTE** | `cliente@duocuc.cl` | `1234` | Navegación de catálogo, carrito de compras dinámico y confirmación de compra con emisión de boleta propia. |

---

## ⚙️ 5. Instrucciones de Ejecución Local

### Prerrequisitos
* Java Development Kit (JDK) 21 LTS
* Node.js v18.0 o superior con npm
* Wallet de Oracle Cloud descomprimida en la raíz del proyecto (`wallet/`)

### 1. Iniciar el Backend (Spring Boot)
```bash
cd vet-sanmarcos-backend
./mvnw spring-boot:run
```
*El servicio REST iniciará en el puerto `8080` conectándose a Oracle ATP.*  
*Consola Swagger disponible en:* `http://localhost:8080/swagger-ui/index.html`

### 2. Iniciar el Frontend (React + Vite)
```bash
cd Vet_SanMarcos_React
npm install
npm run dev
```
*La aplicación web estará disponible en:* `http://localhost:5173`

### 3. Ejecutar Pruebas Unitarias
```bash
cd Vet_SanMarcos_React
npm test
```
*Ejecuta la suite de 13 pruebas unitarias automatizadas con Vitest.*
