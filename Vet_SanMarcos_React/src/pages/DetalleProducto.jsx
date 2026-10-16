import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { catalogoProductos } from '../data/productos'
import { useCart } from '../context/CartContext'

function DetalleProducto() {
  const { id } = useParams()
  const { agregarProducto } = useCart()

  // Buscar el producto por id numérico o por código
  const producto = catalogoProductos.find(
    (p) => String(p.id) === String(id) || p.codigo.toLowerCase() === String(id).toLowerCase()
  )

  // Recuperar stock persistido en localStorage
  const [stock, setStock] = useState(() => {
    if (!producto) return 0
    const guardado = localStorage.getItem(producto.nombre)
    return guardado !== null ? Number(guardado) : producto.stockInicial || 5
  })

  const [cantidad, setCantidad] = useState(1)
  const [mensajeAgregado, setMensajeAgregado] = useState(false)

  useEffect(() => {
    if (producto) {
      localStorage.setItem(producto.nombre, stock)
    }
  }, [stock, producto])

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">El código o identificador "{id}" no existe en el catálogo.</p>
        <Link to="/productos" className="btn btn-primary mt-3">
          ← Volver al Catálogo
        </Link>
      </div>
    )
  }

  const handleAgregar = () => {
    if (stock <= 0) return
    agregarProducto(producto, cantidad)
    // Reducir stock disponible
    setStock((prev) => Math.max(0, prev - cantidad))
    setMensajeAgregado(true)
    setTimeout(() => setMensajeAgregado(false), 3000)
  }

  return (
    <div className="container py-3">
      {/* Migas de pan / Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos" className="text-decoration-none">Productos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="mb-4">
        <h1 className="fw-bold">Detalle del Producto</h1>
        <p className="text-secondary small">ID del producto: <strong>{id}</strong></p>
      </div>

      <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
        <div className="row g-4 align-items-center">
          {/* Imagen del producto */}
          <div className="col-12 col-md-5 text-center">
            <img
              src={producto.imagen}
              alt={producto.alt || producto.nombre}
              className="img-fluid rounded border p-3"
              style={{ maxHeight: '380px', objectFit: 'contain' }}
            />
          </div>

          {/* Información del producto */}
          <div className="col-12 col-md-7">
            <span className="badge bg-secondary mb-2 text-uppercase">
              {producto.categoria} · {producto.codigo}
            </span>
            <h1 className="h2 fw-bold text-dark mb-2">{producto.nombre}</h1>
            <p className="text-muted mb-3">{producto.descripcion}</p>

            <div className="d-flex align-items-baseline gap-3 mb-3">
              <h3 className="text-primary fw-bold m-0">${producto.precio} CLP</h3>
              <span
                className={`badge ${
                  stock > 3 ? 'bg-success' : stock > 0 ? 'bg-warning text-dark' : 'bg-danger'
                }`}
              >
                {stock > 0 ? `Stock disponible: ${stock}` : 'Agotado'}
              </span>
            </div>

            {/* Características destacadas */}
            {producto.caracteristicas && (
              <div className="mb-4">
                <h5 className="h6 fw-bold">Beneficios y detalles:</h5>
                <ul className="small text-secondary ps-3 mb-0">
                  {producto.caracteristicas.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Selector de cantidad y botón agregar */}
            <div className="d-flex flex-wrap align-items-center gap-3 mt-4 pt-3 border-top">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="cantidad-input" className="form-label m-0 fw-semibold">
                  Cantidad:
                </label>
                <div className="input-group" style={{ width: '130px' }}>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    disabled={cantidad <= 1}
                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  >
                    -
                  </button>
                  <input
                    id="cantidad-input"
                    type="text"
                    readOnly
                    className="form-control text-center"
                    value={cantidad}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    disabled={cantidad >= stock}
                    onClick={() => setCantidad((c) => Math.min(stock, c + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="btn btn-primary px-4 py-2"
                onClick={handleAgregar}
                disabled={stock <= 0}
              >
                {stock > 0 ? '🛒 Agregar al Carrito' : 'Sin Stock'}
              </button>

              <Link to="/carrito" className="btn btn-outline-secondary px-3 py-2">
                Ver Carrito
              </Link>
            </div>

            {/* Mensaje de confirmación reactivo */}
            {mensajeAgregado && (
              <div className="alert alert-success mt-3 py-2 px-3 small" role="alert">
                ✓ ¡{cantidad} unidad(es) de <strong>{producto.nombre}</strong> agregadas al carrito!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto
