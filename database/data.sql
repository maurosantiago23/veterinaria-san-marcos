-- ============================================================
-- SCRIPT DML: INSERCION DE DATOS SEMILLA (POBLADO INICIAL)
-- PROYECTO: VETERINARIA SAN MARCOS
-- ASIGNATURA: DSY1104 - EVALUACION PARCIAL 3 (40%)
-- BASE DE DATOS: ORACLE AUTONOMOUS CLOUD (19c)
-- ============================================================

-- 1. Insercion de Categorias
INSERT INTO CATEGORIA (nombre_categoria) VALUES ('Servicios');
INSERT INTO CATEGORIA (nombre_categoria) VALUES ('Farmacia');
INSERT INTO CATEGORIA (nombre_categoria) VALUES ('Alimentos');

-- 2. Insercion de Productos y Servicios (Coincidentes con catalogo de la tienda React)
INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock, imagen_url, id_categoria) 
VALUES ('SRV-001', 'Consulta Veterinaria General', 'Evaluación clínica integral y constantes vitales.', 25000, 10, '/images/Veterinario1.jpg', 1);

INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock, imagen_url, id_categoria) 
VALUES ('FAR-103', 'Simparica 10-20 kg', 'Comprimido masticable para control de pulgas y garrapatas.', 21000, 15, '/images/antiparasitario.jpg', 2);

INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock, imagen_url, id_categoria) 
VALUES ('PRO-201', 'Alimento Perro Adulto Salmón 3 kg', 'Alimento súper premium formulado con salmón fresco.', 19990, 8, '/images/comida_perro.jpg', 3);

INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock, imagen_url, id_categoria) 
VALUES ('FAR-104', 'NexGard Spectra Perros Medianos', 'Tableta masticable mensual contra parásitos.', 23500, 12, '/images/antiparasitario.jpg', 2);

INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock, imagen_url, id_categoria) 
VALUES ('PRO-202', 'Snack Dental Felino 60g', 'Premios crujientes diseñados para limpiar dientes.', 4990, 20, '/images/comida_gato.png', 3);

INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock, imagen_url, id_categoria) 
VALUES ('SRV-002', 'Peluquería y Baño Sanitario', 'Sesión integral con champú hipoalergénico.', 18000, 6, '/images/Veterinario1.jpg', 1);

-- 3. Insercion de Cuentas de Usuario de Demostracion (Matriz de Roles)
INSERT INTO USUARIO (nombre, email, password, telefono, rol) 
VALUES ('Administrador San Marcos', 'admin@veterinaria.cl', '1234', '+56911112222', 'ADMIN');

INSERT INTO USUARIO (nombre, email, password, telefono, rol) 
VALUES ('Vendedora Camila Rojas', 'vendedor@veterinaria.cl', '1234', '+56933334444', 'VENDEDOR');

INSERT INTO USUARIO (nombre, email, password, telefono, rol) 
VALUES ('Mauro Santiago', 'cliente@duocuc.cl', '1234', '+56955556666', 'CLIENTE');

COMMIT;

