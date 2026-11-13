package cl.duoc.vet_sanmarcos_backend.ventas.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class DetalleVentaRequest {

    @NotNull(message = "El ID del producto es obligatorio")
    private Long idProducto;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad minima a comprar es 1")
    private Integer cantidad;

    public DetalleVentaRequest() {
    }

    public DetalleVentaRequest(Long idProducto, Integer cantidad) {
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}
