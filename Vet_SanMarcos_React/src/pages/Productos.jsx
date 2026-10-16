import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Producto from '../components/Producto.jsx'
import { catalogoProductos } from '../data/productos'
import { useCart } from '../context/CartContext'

function Productos() {
  const location = useLocation()
  const navigate = useNavigate()
  const { agregarProducto } = useCart()

  // Soporte para parámetros de búsqueda con useLocation (Paso 8 Guía II)
  const parametros = new URLSearchParams(location.search)
  const categoriaURL = parametros.get('categoria') || 'todos'

  const [categoriaActual, setCategoriaActual] = useState(categoriaURL)
  const [alertaCarrito, setAlertaCarrito] = useState('')

  useEffect(() => {
    if (categoriaURL) {
      setCategoriaActual(categoriaURL)
    }
  }, [categoriaURL])

  const cambiarCategoria = (cat) => {
    setCategoriaActual(cat)
    if (cat === 'todos') {
      navigate('/productos')
    } else {
      navigate(`/productos?categoria=${cat}`)
    }
  }

  const productosFiltrados =
    categoriaActual === 'todos'
      ? catalogoProductos
      : catalogoProductos.filter((prod) => prod.categoria === categoriaActual)

  const handleAgregarAlCarrito = (producto) => {
    agregarProducto(producto, 1)
    setAlertaCarrito(`¡Se añadió "${producto.nombre}" al carrito!`)
    setTimeout(() => setAlertaCarrito(''), 3000)
  }

  return (
    <section>
      <div className="mb-4 text-center">
        <h2>Catálogo General de Productos y Servicios</h2>
        <p className="text-muted">
          Explora todos nuestros productos disponibles para el cuidado, alimentación y salud de tu mascota.
        </p>

        {/* Indicador de categoría seleccionada según useLocation */}
        {categoriaActual !== 'todos' && (
          <p className="badge bg-info text-dark px-3 py-2 fs-6">
            Categoría seleccionada: {categoriaActual.toUpperCase()}
          </p>
        )}

        {/* Notificación flotante de carrito */}
        {alertaCarrito && (
          <div className="alert alert-success py-2 w-auto d-inline-block mx-auto mb-3" role="alert">
            ✓ {alertaCarrito}
          </div>
        )}

        {/* Filtros de categoría reactivos */}
        <div className="d-flex justify-content-center gap-2 flex-wrap my-3">
          <button
            className={`btn btn-sm ${
              categoriaActual === 'todos' ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => cambiarCategoria('todos')}
          >
            Todos ({catalogoProductos.length})
          </button>
          <button
            className={`btn btn-sm ${
              categoriaActual === 'farmacia' ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => cambiarCategoria('farmacia')}
          >
            Farmacia
          </button>
          <button
            className={`btn btn-sm ${
              categoriaActual === 'alimentos' ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => cambiarCategoria('alimentos')}
          >
            Alimentos
          </button>
          <button
            className={`btn btn-sm ${
              categoriaActual === 'servicios' ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => cambiarCategoria('servicios')}
          >
            Servicios
          </button>
        </div>
      </div>

      {/* Grilla responsiva de productos */}
      <div className="row g-4">
        {productosFiltrados.map((producto) => (
          <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
            <Producto
              id={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              descripcion={producto.descripcion}
              imagen={producto.imagen}
              alt={producto.alt}
              stockInicial={producto.stockInicial}
              onAgregarCarrito={handleAgregarAlCarrito}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Productos