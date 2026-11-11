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

### 🏆 Estado Actual Verificado
* **Backend Spring Boot 4.1.2:** Corriendo en AWS EC2 (`t3.medium`) en el puerto `8080`.
* **Oracle Cloud ATP 19c:** Conectado mediante Wallet segura mTLS.
* **Microservicio de Productos:** Probado en vivo vía Swagger UI con respuesta **`HTTP 200 OK`** y retorno del JSON completo con los 6 productos y categorías reales.
