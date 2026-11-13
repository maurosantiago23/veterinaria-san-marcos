package cl.duoc.vet_sanmarcos_backend.ventas.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class VentaRequest {

    @NotNull(message = "El ID de usuario es obligatorio")
    private Long idUsuario;

    @NotEmpty(message = "El carrito no puede estar vacio")
    @Valid
    private List<DetalleVentaRequest> items;

    public VentaRequest() {
    }

    public VentaRequest(Long idUsuario, List<DetalleVentaRequest> items) {
        this.idUsuario = idUsuario;
        this.items = items;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public List<DetalleVentaRequest> getItems() {
        return items;
    }

    public void setItems(List<DetalleVentaRequest> items) {
        this.items = items;
    }
}
