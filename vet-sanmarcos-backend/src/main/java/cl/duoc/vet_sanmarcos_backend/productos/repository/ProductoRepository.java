package cl.duoc.vet_sanmarcos_backend.productos.repository;

import cl.duoc.vet_sanmarcos_backend.productos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para la entidad Producto.
 * Permite ejecutar consultas SQL contra Oracle Cloud sin escribir codigo JDBC manual.
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Buscar producto por su codigo clinico unico (ej: SRV-001, FAR-103)
    Optional<Producto> findByCodigo(String codigo);

    // Filtrar productos pertenecientes a una categoria especifica
    List<Producto> findByCategoriaIdCategoria(Long idCategoria);
}

