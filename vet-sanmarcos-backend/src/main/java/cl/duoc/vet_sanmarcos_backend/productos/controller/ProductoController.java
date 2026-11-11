package cl.duoc.vet_sanmarcos_backend.productos.controller;

import cl.duoc.vet_sanmarcos_backend.productos.model.Categoria;
import cl.duoc.vet_sanmarcos_backend.productos.model.Producto;
import cl.duoc.vet_sanmarcos_backend.productos.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador REST para el Microservicio de Catalogo e Inventario.
 * Versionado de API: /api/v1/productos
 */
@RestController
@RequestMapping("/api/v1/productos")
@CrossOrigin(origins = "*")
@Tag(name = "Productos", description = "Endpoints de catalogo, servicios veterinarios y gestion de stock")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    @Operation(summary = "Listar todos los productos", description = "Devuelve el catalogo completo para la tienda React")
    public ResponseEntity<List<Producto>> listarTodos() {
        return ResponseEntity.ok(productoService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID", description = "Devuelve el detalle de un producto o servicio especifico")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categorias")
    @Operation(summary = "Listar categorias", description = "Devuelve las categorias clinicas disponibles")
    public ResponseEntity<List<Categoria>> listarCategorias() {
        return ResponseEntity.ok(productoService.listarCategorias());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo producto", description = "Permite registrar un nuevo producto en el catalogo (Rol ADMIN)")
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        Producto nuevo = productoService.guardar(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @PutMapping("/{id}/stock")
    @Operation(summary = "Actualizar stock de un producto", description = "Modifica los cupos o stock disponible desde el panel de control")
    public ResponseEntity<?> actualizarStock(@PathVariable Long id, @RequestBody Map<String, Integer> payload) {
        Integer nuevoStock = payload.get("stock");
        if (nuevoStock == null) {
            return ResponseEntity.badRequest().body("Debe incluir el campo 'stock' en el cuerpo de la peticion.");
        }
        try {
            Producto actualizado = productoService.actualizarStock(id, nuevoStock);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

