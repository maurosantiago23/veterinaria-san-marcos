import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { catalogoProductos } from '../data/productos'
import { useCart } from '../context/CartContext'
import { productosApi, normalizarProducto } from '../services/api'

function DetalleProducto() {
  const { id } = useParams()
  const { agregarProducto } = useCart()

  // Buscar primero en el respaldo local
  const [producto, setProducto] = useState(() => {
    const encontrado = catalogoProductos.find(
      (p) => String(p.id) === String(id) || p.codigo?.toLowerCase() === String(id).toLowerCase()
    )
    return encontrado ? normalizarProducto(encontrado) : null
  })

  // Sincronizar en vivo con la API de Spring Boot si está disponible
  useEffect(() => {
    let cancelado = false

    async function cargarDetalleApi() {
      if (id && !isNaN(Number(id))) {
        try {
          const data = await productosApi.obtenerPorId(id)
          if (!cancelado && data) {
            setProducto(normalizarProducto(data))
          }
        } catch {
          // Mantiene el producto del estado inicial
        }
      }
    }

    cargarDetalleApi()

    return () => {
      cancelado = true
    }
  }, [id])

  // Recuperar stock persistido en localStorage o el stock del producto
  const [stock, setStock] = useState(() => {
    if (!producto) return 0
    const guardado = localStorage.getItem(producto.nombre)
    return guardado !== null ? Number(guardado) : producto.stock || 5
  })

  const [cantidad, setCantidad] = useState(1)
  const [mensajeAgregado, setMensajeAgregado] = useState(false)

  useEffect(() => {
    if (producto) {
      setStock((prev) => (prev > 0 ? prev : producto.stock || 5))
      localStorage.setItem(producto.nombre, stock)
    }
  }, [producto])

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

  const esServicio =
    producto.categoria === 'servicios' ||
    producto.nombre.toLowerCase().includes('consulta') ||
    producto.nombre.toLowerCase().includes('peluquería')

  const handleAgregar = () => {
    if (stock <= 0) return
    agregarProducto(producto, cantidad)
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
            <Link to="/productos" className="text-decoration-none">Catálogo</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      {/* Alerta de confirmación de agregado */}
      {mensajeAgregado && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ✓ Se agregaron <strong>{cantidad}</strong> unidad(es) de <strong>{producto.nombre}</strong> al carrito de compras.
          <Link to="/carrito" className="ms-2 alert-link">Ver Carrito</Link>
        </div>
      )}

      <div className="row g-4 align-items-center">
        {/* Imagen del producto */}
        <div className="col-12 col-md-5 text-center">
          <div className="p-3 border rounded bg-white shadow-sm">
            <img
              src={producto.imagen}
              alt={producto.alt || producto.nombre}
              className="img-fluid rounded"
              style={{ maxHeight: '380px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Información y compra */}
        <div className="col-12 col-md-7">
          <span className="badge bg-secondary text-uppercase mb-2">
            {producto.categoria}
          </span>
          <h1 className="h2 fw-bold text-primary mb-2">{producto.nombre}</h1>
          <p className="text-muted small mb-2">Código Clínico: <code>{producto.codigo}</code></p>

          <p className="lead text-dark mb-3">{producto.descripcion}</p>

          <h3 className="text-success fw-bold mb-3">
            ${producto.precio} <span className="fs-6 text-muted fw-normal">CLP (IVA incluido)</span>
          </h3>

          <p className="mb-3">
            <strong>Disponibilidad: </strong>
            {stock > 0 ? (
              <span className="badge bg-success">
                {esServicio ? `Cupos disponibles hoy: ${stock}` : `En stock (${stock} unidades)`}
              </span>
            ) : (
              <span className="badge bg-danger">Agotado temporalmente</span>
            )}
          </p>

          {/* Características destacadas */}
          <div className="mb-4">
            <h5 className="fw-semibold">Detalles y Especificaciones:</h5>
            <ul className="list-unstyled ps-3">
              {producto.caracteristicas?.map((item, idx) => (
                <li key={idx} className="mb-1 text-secondary">
                  ✓ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Selector de cantidad y botón */}
          <div className="d-flex align-items-center gap-3">
            <div className="input-group" style={{ maxWidth: '140px' }}>
              <span className="input-group-text">Cant.</span>
              <input
                type="number"
                min="1"
                max={stock}
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, Math.min(stock, Number(e.target.value))))}
                className="form-control text-center"
                disabled={stock <= 0}
              />
            </div>

            <button
              onClick={handleAgregar}
              className="btn btn-primary px-4 py-2"
              disabled={stock <= 0}
            >
              {stock <= 0 ? 'Sin Stock' : (esServicio ? '📅 Reservar Cupo' : '🛒 Agregar al Carrito')}
            </button>

            <Link to="/productos" className="btn btn-outline-secondary">
              Volver al Catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto
