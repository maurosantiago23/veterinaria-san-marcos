package cl.duoc.vet_sanmarcos_backend.ventas.repository;

import cl.duoc.vet_sanmarcos_backend.ventas.model.DetalleBoleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para las lineas de detalle de las boletas.
 */
@Repository
public interface DetalleBoletaRepository extends JpaRepository<DetalleBoleta, Long> {

    List<DetalleBoleta> findByBoletaIdBoleta(Long idBoleta);
}

