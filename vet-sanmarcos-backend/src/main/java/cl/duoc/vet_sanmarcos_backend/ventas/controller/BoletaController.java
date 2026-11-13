package cl.duoc.vet_sanmarcos_backend.ventas.controller;

import cl.duoc.vet_sanmarcos_backend.ventas.dto.BoletaResponse;
import cl.duoc.vet_sanmarcos_backend.ventas.dto.VentaRequest;
import cl.duoc.vet_sanmarcos_backend.ventas.service.BoletaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador REST para el Microservicio de Ventas y Boletas.
 * Versionado de API: /api/v1/boletas
 */
@RestController
@RequestMapping("/api/v1/boletas")
@CrossOrigin(origins = "*")
@Tag(name = "Ventas", description = "Endpoints para emitir boletas de compra, listar ordenes para Vendedor/Admin y ver historial")
public class BoletaController {

    private final BoletaService boletaService;

    public BoletaController(BoletaService boletaService) {
        this.boletaService = boletaService;
    }

    @PostMapping
    @Operation(summary = "Procesar compra y emitir boleta", description = "Recibe los items del carrito, descuenta stock de productos y emite la boleta oficial")
    public ResponseEntity<?> procesarVenta(@Valid @RequestBody VentaRequest request) {
        try {
            BoletaResponse boleta = boletaService.procesarVenta(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(boleta);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error interno al procesar la venta: " + e.getMessage()));
        }
    }

    @GetMapping
    @Operation(summary = "Listar todas las boletas", description = "Devuelve el historial de todas las ordenes emitidas (Rol VENDEDOR y ADMIN)")
    public ResponseEntity<List<BoletaResponse>> listarTodas() {
        return ResponseEntity.ok(boletaService.listarTodas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener boleta por ID", description = "Devuelve el detalle completo de una boleta por su identificador")
    public ResponseEntity<BoletaResponse> obtenerPorId(@PathVariable Long id) {
        return boletaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{idUsuario}")
    @Operation(summary = "Listar compras de un usuario", description = "Devuelve las boletas emitidas a nombre de un cliente especifico")
    public ResponseEntity<List<BoletaResponse>> listarPorUsuario(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(boletaService.listarPorUsuario(idUsuario));
    }
}
