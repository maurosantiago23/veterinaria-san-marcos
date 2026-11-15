package cl.duoc.vet_sanmarcos_backend.ventas.model;

import cl.duoc.vet_sanmarcos_backend.usuarios.model.Usuario;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad JPA que representa la tabla BOLETA en Oracle Cloud.
 * Almacena el encabezado de cada compra emitida en la veterinaria.
 */
@Entity
@Table(name = "BOLETA")
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_boleta")
    private Long idBoleta;

    @Column(name = "numero_orden", length = 50, nullable = false)
    private String numeroOrden;

    @Column(name = "fecha_emision", nullable = false)
    private LocalDateTime fechaEmision;

    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    // Relacion con el usuario/cliente titular de la compra
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    // Relacion Uno a Muchos con los detalles de la boleta
    @OneToMany(mappedBy = "boleta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DetalleBoleta> detalles = new ArrayList<>();

    public Boleta() {
        this.fechaEmision = LocalDateTime.now();
        this.numeroOrden = "ORD-" + System.currentTimeMillis();
    }

    public Boleta(Long idBoleta, String numeroOrden, LocalDateTime fechaEmision, BigDecimal total, Usuario usuario) {
        this.idBoleta = idBoleta;
        this.numeroOrden = numeroOrden != null ? numeroOrden : "ORD-" + System.currentTimeMillis();
        this.fechaEmision = fechaEmision != null ? fechaEmision : LocalDateTime.now();
        this.total = total;
        this.usuario = usuario;
    }

    public void agregarDetalle(DetalleBoleta detalle) {
        detalles.add(detalle);
        detalle.setBoleta(this);
    }

    // --- GETTERS Y SETTERS ---
    public Long getIdBoleta() {
        return idBoleta;
    }

    public void setIdBoleta(Long idBoleta) {
        this.idBoleta = idBoleta;
    }

    public String getNumeroOrden() {
        return numeroOrden;
    }

    public void setNumeroOrden(String numeroOrden) {
        this.numeroOrden = numeroOrden;
    }

    public LocalDateTime getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDateTime fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<DetalleBoleta> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleBoleta> detalles) {
        this.detalles = detalles;
    }
}

