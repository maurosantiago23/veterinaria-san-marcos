package cl.duoc.vet_sanmarcos_backend.usuarios.controller;

import cl.duoc.vet_sanmarcos_backend.usuarios.dto.LoginRequest;
import cl.duoc.vet_sanmarcos_backend.usuarios.dto.LoginResponse;
import cl.duoc.vet_sanmarcos_backend.usuarios.dto.RegisterRequest;
import cl.duoc.vet_sanmarcos_backend.usuarios.model.Usuario;
import cl.duoc.vet_sanmarcos_backend.usuarios.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador REST para el Microservicio de Usuarios y Autenticacion.
 * Versionado de API: /api/v1/auth
 */
@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Autenticacion", description = "Endpoints de login, registro de clientes y gestion de roles JWT")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesion", description = "Valida credenciales y devuelve un token JWT con el rol asignado (ADMIN, VENDEDOR, CLIENTE)")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse response = usuarioService.login(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar nuevo cliente", description = "Crea una cuenta con rol CLIENTE y devuelve token de sesion inmediato")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            LoginResponse response = usuarioService.registro(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/usuarios")
    @Operation(summary = "Listar usuarios", description = "Devuelve los usuarios registrados en el sistema")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }
}
