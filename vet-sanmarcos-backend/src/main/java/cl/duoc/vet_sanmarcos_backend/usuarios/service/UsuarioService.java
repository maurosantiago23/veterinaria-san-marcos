package cl.duoc.vet_sanmarcos_backend.usuarios.service;

import cl.duoc.vet_sanmarcos_backend.usuarios.dto.LoginRequest;
import cl.duoc.vet_sanmarcos_backend.usuarios.dto.LoginResponse;
import cl.duoc.vet_sanmarcos_backend.usuarios.dto.RegisterRequest;
import cl.duoc.vet_sanmarcos_backend.usuarios.jwt.JwtUtils;
import cl.duoc.vet_sanmarcos_backend.usuarios.model.Usuario;
import cl.duoc.vet_sanmarcos_backend.usuarios.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio que encapsula la logica de negocio de cuentas de usuario y autenticacion.
 */
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Autentica a un usuario y genera su token JWT con rol.
     * Soporta tanto contrasenas planas de prueba (1234) como contrasenas encriptadas con BCrypt.
     */
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        String emailNorm = request.getEmail().trim().toLowerCase();
        Usuario usuario = usuarioRepository.findByEmail(emailNorm)
                .orElseThrow(() -> new IllegalArgumentException("Credenciales invalidas: usuario no encontrado."));

        boolean match = request.getPassword().equals(usuario.getPassword())
                || passwordEncoder.matches(request.getPassword(), usuario.getPassword());

        if (!match) {
            throw new IllegalArgumentException("Credenciales invalidas: contrasena incorrecta.");
        }

        String token = jwtUtils.generateToken(usuario);
        return new LoginResponse(token, usuario.getIdUsuario(), usuario.getNombre(), usuario.getEmail(), usuario.getRol());
    }

    /**
     * Registra un nuevo usuario con rol CLIENTE por defecto.
     */
    @Transactional
    public LoginResponse registro(RegisterRequest request) {
        String emailNorm = request.getEmail().trim().toLowerCase();
        if (usuarioRepository.existsByEmail(emailNorm)) {
            throw new IllegalArgumentException("El correo electronico ya esta registrado.");
        }

        Usuario nuevo = new Usuario();
        nuevo.setNombre(request.getNombre().trim());
        nuevo.setEmail(emailNorm);
        nuevo.setPassword(passwordEncoder.encode(request.getPassword()));
        nuevo.setTelefono(request.getTelefono());
        nuevo.setRol("CLIENTE"); // Rol asignado por defecto segun la pauta

        Usuario guardado = usuarioRepository.save(nuevo);
        String token = jwtUtils.generateToken(guardado);
        return new LoginResponse(token, guardado.getIdUsuario(), guardado.getNombre(), guardado.getEmail(), guardado.getRol());
    }

    @Transactional(readOnly = true)
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Usuario> obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email.trim().toLowerCase());
    }

    @Transactional(readOnly = true)
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
}

