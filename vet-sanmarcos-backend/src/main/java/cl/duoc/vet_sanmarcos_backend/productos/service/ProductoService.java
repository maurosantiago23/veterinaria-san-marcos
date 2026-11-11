package cl.duoc.vet_sanmarcos_backend.productos.service;

import cl.duoc.vet_sanmarcos_backend.productos.model.Categoria;
import cl.duoc.vet_sanmarcos_backend.productos.model.Producto;
import cl.duoc.vet_sanmarcos_backend.productos.repository.CategoriaRepository;
import cl.duoc.vet_sanmarcos_backend.productos.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio que encapsula las reglas de negocio del inventario clinico y servicios.
 * Aplica transaccionalidad y validaciones de stock.
 */
@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    // Inyeccion de dependencias por constructor (mejor practica recomendada por Spring)
    public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    /**
     * Retorna todo el catalogo disponible para mostrar en la tienda React.
     */
    @Transactional(readOnly = true)
    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    /**
     * Busca un producto por su ID numerico.
     */
    @Transactional(readOnly = true)
    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }

    /**
     * Retorna todas las categorias clinicas para filtros o formularios.
     */
    @Transactional(readOnly = true)
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    /**
     * Guarda o actualiza un producto en el catalogo (Uso exclusivo Administrador).
     */
    @Transactional
    public Producto guardar(Producto producto) {
        if (producto.getStock() == null || producto.getStock() < 0) {
            throw new IllegalArgumentException("El stock no puede ser negativo.");
        }
        return productoRepository.save(producto);
    }

    /**
     * Actualiza directamente el stock de un producto o cupos de un servicio.
     * Utilizado en la vista de administracion de inventario.
     */
    @Transactional
    public Producto actualizarStock(Long id, Integer nuevoStock) {
        if (nuevoStock < 0) {
            throw new IllegalArgumentException("El stock o cupo no puede ser negativo.");
        }
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto con ID " + id + " no encontrado."));
        
        producto.setStock(nuevoStock);
        return productoRepository.save(producto);
    }

    /**
     * Metodo consumido por el Microservicio de Ventas al concretar una compra.
     * Descuenta del inventario la cantidad comprada verificando stock disponible.
     */
    @Transactional
    public void descontarStock(Long id, Integer cantidad) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto con ID " + id + " no encontrado."));
        
        if (producto.getStock() < cantidad) {
            throw new IllegalStateException("Stock insuficiente para el producto: " + producto.getNombre() + 
                    ". Disponible: " + producto.getStock() + ", Solicitado: " + cantidad);
        }
        
        producto.setStock(producto.getStock() - cantidad);
        productoRepository.save(producto);
    }
}

