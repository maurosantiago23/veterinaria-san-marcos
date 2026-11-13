package cl.duoc.vet_sanmarcos_backend.ventas.model;

import cl.duoc.vet_sanmarcos_backend.productos.model.Producto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Entidad JPA que representa la tabla DETALLE_BOLETA en Oracle Cloud.
 * Almacena cada producto o servicio comprado dentro de una boleta.
 */
@Entity
@Table(name = "DETALLE_BOLETA")
public class DetalleBoleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Long idDetalle;

    // Relacion con la Boleta contenedora
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_boleta", nullable = false)
    @JsonIgnore
    private Boleta boleta;

    // Relacion con el Producto o Servicio adquirido
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    public DetalleBoleta() {
    }

    public DetalleBoleta(Long idDetalle, Boleta boleta, Producto producto, Integer cantidad, 
                         BigDecimal precioUnitario, BigDecimal subtotal) {
        this.idDetalle = idDetalle;
        this.boleta = boleta;
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = subtotal;
    }

    // --- GETTERS Y SETTERS ---
    public Long getIdDetalle() {
        return idDetalle;
    }

    public void setIdDetalle(Long idDetalle) {
        this.idDetalle = idDetalle;
    }

    public Boleta getBoleta() {
        return boleta;
    }

    public void setBoleta(Boleta boleta) {
        this.boleta = boleta;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}
