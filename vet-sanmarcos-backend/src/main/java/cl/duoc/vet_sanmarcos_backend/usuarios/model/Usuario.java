package cl.duoc.vet_sanmarcos_backend.usuarios.model;

import jakarta.persistence.*;

/**
 * Entidad JPA que representa la tabla USUARIO en Oracle Cloud.
 * Maneja credenciales y roles para control de acceso (ADMIN, VENDEDOR, CLIENTE).
 */
@Entity
@Table(name = "USUARIO")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "telefono", length = 20)
    private String telefono;

    @Column(name = "rol", nullable = false, length = 20)
    private String rol; // 'ADMIN', 'VENDEDOR', 'CLIENTE'

    public Usuario() {
    }

    public Usuario(Long idUsuario, String nombre, String email, String password, String telefono, String rol) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.rol = rol;
    }

    // --- GETTERS Y SETTERS ---
    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
