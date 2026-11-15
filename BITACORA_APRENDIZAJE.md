# 📓 Bitácora de Aprendizajes y Errores Resueltos
**Proyecto:** Veterinaria San Marcos  
**Asignatura:** DSY1104 - Evaluación Parcial 3 (40%)  
**Autores:** Mauro Santiago & Gabriel González  

Esta bitácora recopila en formato **mini-resumen** los problemas técnicos encontrados y su solución exacta, ideal para repasar antes de la defensa oral frente al profesor.

---

### 1. Base de Datos Oracle Autonomous Cloud (ATP 19c)
* **Problema:** Rechazo al crear la base de datos con contraseña de administrador.
  * **Causa:** La política de seguridad de Oracle prohíbe que la contraseña contenga la palabra *"admin"*.
  * **Solución:** Se utilizó una contraseña corporativa válida: `VetSanMarcos2026#`.

* **Problema:** Error *"Invalid credentials"* al intentar entrar a Database Actions (Worksheet) con el usuario `VET_USER`.
  * **Causa:** Los usuarios creados por SQL puro en Oracle no tienen habilitado el acceso web (ORDS - *Oracle REST Data Services*) por defecto.
  * **Solución:** Conectados como `ADMIN`, se ejecutó el procedimiento `ORDS.ENABLE_SCHEMA` para habilitar el acceso web.

---

### 2. Maven y Dependencias de Oracle en Spring Boot
* **Problema:** Fallo en `./mvnw spring-boot:run` indicando `'dependencies.dependency.version' for osdt_core/osdt_cert is missing`.
  * **Causa:** El padre de Spring Boot no incluye por defecto las versiones de los módulos de seguridad criptográfica de Oracle.
  * **Solución:** Se definió la versión explícita `<version>21.13.0.0</version>` en `oraclepki`, `osdt_core` y `osdt_cert` dentro del `pom.xml`.

---

### 3. Conexión mTLS con la Wallet de Oracle
* **Problema:** Error `Driver claims to not accept jdbcUrl, jdbc:oracle:thin@vetsanmarcos_low?TNSADMIN=...`.
  * **Causa:** Al pasar la ruta de la Wallet por variable de entorno de consola (`SPRING_DATASOURCE_URL`), Linux eliminó los dos puntos (`:`) tras `thin` y el guion bajo (`_`) de `TNS_ADMIN`, generando una URL malformada que el driver de Oracle rechazó.
  * **Solución:** 
    1. Se limpió la URL en `application.properties` dejándola estándar: `jdbc:oracle:thin:@vetsanmarcos_low`.
    2. Se configuró en `VetSanmarcosBackendApplication.java` la asignación automática de la propiedad del sistema `oracle.net.tns_admin` (detecta si corre en Windows local o en AWS Linux).

---

### 4. Seguridad Básica vs Swagger UI
* **Problema:** Al abrir Swagger (`/swagger-ui/index.html`) en el navegador, saltaba una ventana emergente pidiendo usuario y contraseña.
  * **Causa:** Al incluir `spring-boot-starter-security`, Spring protege todas las rutas por defecto con HTTP Basic Auth y genera una contraseña aleatoria en consola.
  * **Solución:** Se creó `SecurityConfig.java` permitiendo acceso público (`.permitAll()`) a la documentación de Swagger (`/swagger-ui/**`, `/v3/api-docs/**`) y a la consulta de productos (`/api/v1/productos/**`), además de habilitar CORS para la comunicación con React.

---

### 5. Frontend React y Rutas en AWS EC2
* **Problema:** `npm error enoent Could not read package.json`.
  * **Causa:** Ejecutar `npm run dev` desde la raíz de `veterinaria-san-marcos` en vez de entrar al directorio del frontend.
  * **Solución:** Entrar a la carpeta correspondiente: `cd Vet_SanMarcos_React`.

---

### 6. Microservicio de Usuarios y Autenticación JWT (Sin sobreingeniería)
* **Diseño aplicado:** Módulo CSR directo (`Usuario`, `UsuarioRepository`, `UsuarioService`, `AuthController`) mapeado fielmente a la tabla `USUARIO` de Oracle.
* **Manejo de Contraseñas:** Validación dual en `UsuarioService` para aceptar tanto contraseñas de prueba del seed SQL (`1234`) como contraseñas encriptadas con `BCrypt`, asegurando que las cuentas demo del profesor siempre funcionen.
* **Seguridad de Tokens:** Emisión de tokens JWT con roles (`ADMIN`, `VENDEDOR`, `CLIENTE`) firmados con HMAC-SHA256, liberando las rutas `/api/v1/auth/**` en `SecurityConfig.java`.

---

### 7. Microservicio de Ventas y Boletas (Integración entre dominios)
* **Diseño aplicado:** Módulo CSR completo (`Boleta`, `DetalleBoleta`, `BoletaRepository`, `DetalleBoletaRepository`, `BoletaService`, `BoletaController`) mapeado a las tablas `BOLETA` y `DETALLE_BOLETA` en Oracle Cloud.
* **Comunicación entre Microservicios:** `BoletaService` actúa como el servicio híbrido: consume `UsuarioRepository` para validar al titular y `ProductoService` para verificar y descontar stock clínico.
* **Transaccionalidad (`@Transactional`):** Garantiza atomicidad; si un ítem falla por stock insuficiente, se aplica rollback automático y no se crea la boleta ni se altera el inventario.

---

### 8. Integración Frontend-Backend y Resiliencia del Catálogo (React ↔ Spring Boot)
* **Situación inicial:** El catálogo en React dependía de un archivo estático en memoria (`src/data/productos.js`). No reflejaba los cambios de stock en Oracle Cloud ni las consultas dinámicas a la base de datos.
* **Diferencia de Modelos:** El backend retorna campos de base de datos (`idProducto`, `imagenUrl`, entidad `categoria`), mientras que el frontend usaba `id`, `imagen`, y categorías como string.
* **Solución implementada:**
  1. Se creó el cliente API centralizado (`src/services/api.js`) con detección automática de URL (localhost o IP de AWS) e inyección de token JWT.
  2. Se diseñó la función `normalizarProducto()` para unificar los atributos de Oracle/JPA con las interfaces de React sin romper componentes existentes.
  3. **Patrón de Resiliencia:** `Productos.jsx` e `Inicio.jsx` consultan `GET /api/v1/productos` en vivo. Si el backend está activo, muestra los datos directos de Oracle ATP 19c con un indicador visual; si está offline, conmuta automáticamente a un catálogo semilla de respaldo sin romper la experiencia ni los tests.
  4. Se mantuvo la regla de negocio para servicios veterinarios mostrando *"Cupos disponibles hoy: X"*.

---

### 9. Autenticación JWT, Persistencia Anti-F5 y Control de Roles (IE3.3.1 - IE3.3.6)
* **Situación inicial:** El inicio de sesión dependía de strings locales y no validaba credenciales reales ni emitía tokens JWT. Además, existía riesgo de inconsistencias al recargar la página.
* **Solución implementada:**
  1. **Autenticación Real con JWT (`POST /api/v1/auth/login`):** `AuthContext.jsx` y `Login.jsx` se conectaron al microservicio de usuarios. Al autenticarse, Spring Boot valida contra Oracle Cloud y emite un token JWT con el rol asignado (`ADMIN`, `VENDEDOR`, `CLIENTE`).
  2. **Persistencia de Sesión ante Recargas (F5 - IE3.3.2):** Se estructuró la lectura inicial en `localStorage` (`veterinaria_user`), garantizando que al presionar F5 o navegar entre rutas, la sesión, el token y el perfil no se destruyan.
  3. **Restricción de Acceso a Interfaces según Roles (IE3.3.3 / IE3.3.6):** `Navbar.jsx` ahora discrimina la navegación: muestra el nombre y rol en un badge (`👤 Mauro (ADMIN)`), pero los botones hacia el `/admin` quedan restringidos únicamente para administradores o vendedores.
  4. **Modo Respaldo y Pruebas Unitarias:** Si el backend está apagado o en entorno de tests Vitest, se activa un fallback transparente para que las 13 pruebas unitarias sigan pasando en verde sin dependencias de red externas.

---

### 10. Emisión Transaccional de Boletas y Blindaje de Build (Misiones 4 y 5)
* **Situación inicial:** El carrito generaba un identificador de orden estático (`#VSM-784920`) y no enviaba la venta a la base de datos en Oracle Cloud.
* **Problema de Build detectado:** En `Registro.jsx`, la función manejadora de eventos ejecutaba `await` sin haber declarado la función con la palabra clave `async`, lo cual impedía el empaquetado de producción (`npm run build`).
* **Solución implementada:**
  1. **Generación Real de Boletas (`POST /api/v1/boletas`):** `Carrito.jsx` envía el payload `VentaRequest` asociando el `idUsuario` autenticado y los ítems con sus IDs y cantidades.
  2. **Persistencia y Comprobante Oficial:** Al confirmar la compra, se presenta el comprobante oficial con el folio devuelto por Oracle (`#BOL-{idBoleta}`), la fecha oficial y el desglose de productos, vaciando el carrito reactivamente.
  3. **Visualización Administrativa:** `AdminDashboard.jsx` incorpora la sincronización de boletas emitidas y cálculo en tiempo real del monto acumulado de ventas.
  4. **Resolución de Error en Vite:** Se declaró `async` en `handleSubmit` de `Registro.jsx`, logrando que `npm run build` termine exitosamente en 329 ms.
  5. **Verificación de Pruebas Unitarias:** Ejecución de `npm test -- --run` con 13/13 pruebas en verde.

---

### 11. Refinamiento en AWS EC2 y Restricción Estricta de Inventario (IE3.3.3 / IE3.3.6)
* **Problema 1 (Mapeo de Categorías Oracle):** En la entidad JPA `Categoria.java`, el campo en la base de datos se denomina `nombreCategoria`, por lo que en el frontend `item.categoria?.nombre` retornaba `undefined` al recibir la respuesta real de Oracle ATP 19c.
  * **Solución:** Se actualizó `normalizarProducto()` en `src/services/api.js` para priorizar `item.categoria?.nombreCategoria`, normalizando el catálogo clínico en vivo.
* **Problema 2 (Alteración de Stock no Autorizada):** Las tarjetas de producto (`Producto.jsx`) mostraban controles `+` y `-` para modificar el stock a cualquier visitante anónimo sin sesión.
  * **Solución:** Se aplicó restricción por roles conectando `Producto.jsx` con `useAuth()`. Si el usuario no ha iniciado sesión o posee rol de `CLIENTE`, los botones de modificar stock se **ocultan por completo**, dejando únicamente las acciones permitidas (ver detalle y agregar al carrito). Los controles de inventario solo se muestran si el usuario autenticado tiene rol de `ADMIN`.
* **Problema 3 (Alineación de Credenciales de Demostración):** Se sincronizaron las pantallas de `Login.jsx` y `AdminDashboard.jsx` con los correos exactos registrados en el script `data.sql` (`admin@veterinaria.cl`, `cliente@duocuc.cl` y `vendedor@veterinaria.cl`, todos con clave `1234`).
* **Verificación:** Pruebas unitarias de Vitest 13/13 en verde y compilación de producción exitosa en 265 ms.

---

### 🏆 Estado Actual Verificado
* **Base de Datos (Oracle Autonomous ATP 19c):** 5 tablas en 3FN y conexión mTLS con Wallet activa.
* **Backend Spring Boot 4.1.2:** Los 3 microservicios (Productos, Usuarios, Ventas) 100% operativos en AWS EC2 (`http://54.198.138.158:8080`) y documentados en Swagger.
* **Frontend React 19:** Activo en AWS EC2 (`http://54.198.138.158:5173`), integrado con Oracle Cloud, catálogo en vivo, JWT, carrito y boletas.
* **Seguridad y Roles:** Restricciones de acceso y acciones estrictamente validadas para Administrador, Vendedor y Cliente.
* **Compilación y Empaquetado:** `npm run build` genera el bundle de producción sin advertencias ni errores.
* **Pruebas Unitarias:** 13/13 tests en verde con Vitest.

