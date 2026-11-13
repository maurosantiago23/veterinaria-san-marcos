package cl.duoc.vet_sanmarcos_backend.ventas.repository;

import cl.duoc.vet_sanmarcos_backend.ventas.model.Boleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad Boleta.
 */
@Repository
public interface BoletaRepository extends JpaRepository<Boleta, Long> {

    // Listar boletas de un cliente especifico ordenadas por fecha descendente
    List<Boleta> findByUsuarioIdUsuarioOrderByFechaEmisionDesc(Long idUsuario);

    // Listar todas las boletas para el panel del Vendedor y Admin ordenadas por fecha reciente
    List<Boleta> findAllByOrderByFechaEmisionDesc();
}
