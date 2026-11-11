package cl.duoc.vet_sanmarcos_backend.productos.repository;

import cl.duoc.vet_sanmarcos_backend.productos.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio JPA para la entidad Categoria.
 * Hereda metodos CRUD automaticos de JpaRepository (findAll, findById, save, etc.).
 */
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    // Metodo derivado automatico para buscar por nombre exacto
    Optional<Categoria> findByNombreCategoria(String nombreCategoria);
}

