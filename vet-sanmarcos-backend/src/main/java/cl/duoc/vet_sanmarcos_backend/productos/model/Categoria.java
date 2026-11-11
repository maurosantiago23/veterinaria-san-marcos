package cl.duoc.vet_sanmarcos_backend.productos.model;

import jakarta.persistence.*;

/**
 * Entidad JPA que representa la tabla CATEGORIA en Oracle Cloud.
 * Agrupa productos en: Servicios Medicos, Farmacia Clinica, Alimentos y Accesorios.
 */
@Entity
@Table(name = "CATEGORIA")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long idCategoria;

    @Column(name = "nombre_categoria", nullable = false, unique = true, length = 50)
    private String nombreCategoria;

    // Constructor vacio requerido por JPA / Hibernate
    public Categoria() {
    }

    // Constructor con parametros para facilitar pruebas
    public Categoria(Long idCategoria, String nombreCategoria) {
        this.idCategoria = idCategoria;
        this.nombreCategoria = nombreCategoria;
    }

    // --- GETTERS Y SETTERS ---
    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getNombreCategoria() {
        return nombreCategoria;
    }

    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }
}

