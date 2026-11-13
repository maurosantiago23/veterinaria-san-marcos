package cl.duoc.vet_sanmarcos_backend.ventas.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class BoletaResponse {

    private Long idBoleta;
    private LocalDateTime fechaEmision;
    private BigDecimal total;
    private Long idUsuario;
    private String nombreCliente;
    private String emailCliente;
    private List<DetalleBoletaResponse> detalles;

    public BoletaResponse() {
    }

    public BoletaResponse(Long idBoleta, LocalDateTime fechaEmision, BigDecimal total, 
                          Long idUsuario, String nombreCliente, String emailCliente, 
                          List<DetalleBoletaResponse> detalles) {
        this.idBoleta = idBoleta;
        this.fechaEmision = fechaEmision;
        this.total = total;
        this.idUsuario = idUsuario;
        this.nombreCliente = nombreCliente;
        this.emailCliente = emailCliente;
        this.detalles = detalles;
    }

    public Long getIdBoleta() {
        return idBoleta;
    }

    public void setIdBoleta(Long idBoleta) {
        this.idBoleta = idBoleta;
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

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getEmailCliente() {
        return emailCliente;
    }

    public void setEmailCliente(String emailCliente) {
        this.emailCliente = emailCliente;
    }

    public List<DetalleBoletaResponse> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleBoletaResponse> detalles) {
        this.detalles = detalles;
    }
}

