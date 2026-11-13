package cl.duoc.vet_sanmarcos_backend.ventas.service;

import cl.duoc.vet_sanmarcos_backend.productos.model.Producto;
import cl.duoc.vet_sanmarcos_backend.productos.repository.ProductoRepository;
import cl.duoc.vet_sanmarcos_backend.productos.service.ProductoService;
import cl.duoc.vet_sanmarcos_backend.usuarios.model.Usuario;
import cl.duoc.vet_sanmarcos_backend.usuarios.repository.UsuarioRepository;
import cl.duoc.vet_sanmarcos_backend.ventas.dto.*;
import cl.duoc.vet_sanmarcos_backend.ventas.model.Boleta;
import cl.duoc.vet_sanmarcos_backend.ventas.model.DetalleBoleta;
import cl.duoc.vet_sanmarcos_backend.ventas.repository.BoletaRepository;
import cl.duoc.vet_sanmarcos_backend.ventas.repository.DetalleBoletaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Servicio de Lógica de Negocio para Ventas y Boletas.
 * Coordina la verificación de usuarios, el descuento de stock clínico mediante ProductoService
 * y el guardado transaccional en Oracle Cloud.
 */
@Service
public class BoletaService {

    private final BoletaRepository boletaRepository;
    private final DetalleBoletaRepository detalleBoletaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final ProductoService productoService;

    public BoletaService(BoletaRepository boletaRepository,
                         DetalleBoletaRepository detalleBoletaRepository,
                         UsuarioRepository usuarioRepository,
                         ProductoRepository productoRepository,
                         ProductoService productoService) {
        this.boletaRepository = boletaRepository;
        this.detalleBoletaRepository = detalleBoletaRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
        this.productoService = productoService;
    }

    /**
     * Procesa una orden de compra desde el carrito de React.
     * Es @Transactional: si un producto no tiene stock, se hace rollback y no se descuenta nada.
     */
    @Transactional
    public BoletaResponse procesarVenta(VentaRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("El carrito no contiene productos para procesar la compra.");
        }

        // 1. Validar cliente autenticado
        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new IllegalArgumentException("Usuario titular con ID " + request.getIdUsuario() + " no encontrado."));

        // 2. Crear encabezado de boleta
        Boleta boleta = new Boleta();
        boleta.setUsuario(usuario);
        boleta.setFechaEmision(LocalDateTime.now());

        BigDecimal total = BigDecimal.ZERO;

        // 3. Procesar cada item del carrito
        for (DetalleVentaRequest item : request.getItems()) {
            Producto producto = productoRepository.findById(item.getIdProducto())
                    .orElseThrow(() -> new IllegalArgumentException("Producto con ID " + item.getIdProducto() + " no encontrado en el catalogo."));

            // Descontar stock usando el servicio de Productos (aplica validacion de stock suficiente)
            productoService.descontarStock(producto.getIdProducto(), item.getCantidad());

            BigDecimal subtotal = producto.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad()));
            total = total.add(subtotal);

            DetalleBoleta detalle = new DetalleBoleta();
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setSubtotal(subtotal);

            boleta.agregarDetalle(detalle);
        }

        boleta.setTotal(total);

        // 4. Guardar boleta y sus detalles en cascada
        Boleta guardada = boletaRepository.save(boleta);

        return mapearABoletaResponse(guardada);
    }

    /**
     * Lista todas las boletas para las vistas del Vendedor y Administrador.
     */
    @Transactional(readOnly = true)
    public List<BoletaResponse> listarTodas() {
        return boletaRepository.findAllByOrderByFechaEmisionDesc()
                .stream()
                .map(this::mapearABoletaResponse)
                .toList();
    }

    /**
     * Obtiene una boleta por su ID.
     */
    @Transactional(readOnly = true)
    public Optional<BoletaResponse> obtenerPorId(Long id) {
        return boletaRepository.findById(id).map(this::mapearABoletaResponse);
    }

    /**
     * Lista el historial de compras de un cliente en particular.
     */
    @Transactional(readOnly = true)
    public List<BoletaResponse> listarPorUsuario(Long idUsuario) {
        return boletaRepository.findByUsuarioIdUsuarioOrderByFechaEmisionDesc(idUsuario)
                .stream()
                .map(this::mapearABoletaResponse)
                .toList();
    }

    // Helper privado de mapeo Entity -> DTO para serializacion JSON segura
    private BoletaResponse mapearABoletaResponse(Boleta boleta) {
        List<DetalleBoletaResponse> detallesDto = new ArrayList<>();
        if (boleta.getDetalles() != null) {
            for (DetalleBoleta d : boleta.getDetalles()) {
                detallesDto.add(new DetalleBoletaResponse(
                        d.getIdDetalle(),
                        d.getProducto().getIdProducto(),
                        d.getProducto().getCodigo(),
                        d.getProducto().getNombre(),
                        d.getCantidad(),
                        d.getPrecioUnitario(),
                        d.getSubtotal()
                ));
            }
        }

        return new BoletaResponse(
                boleta.getIdBoleta(),
                boleta.getFechaEmision(),
                boleta.getTotal(),
                boleta.getUsuario().getIdUsuario(),
                boleta.getUsuario().getNombre(),
                boleta.getUsuario().getEmail(),
                detallesDto
        );
    }
}
