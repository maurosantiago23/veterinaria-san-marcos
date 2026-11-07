import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Producto({
  id = '1',
  nombre,
  precio,
  imagen,
  descripcion,
  stockInicial = 5,
  categoria = '',
  onAgregarCarrito,
}) {
  const [stock, setStock] = useState(() => {
    const stockGuardado = localStorage.getItem(nombre)
    return stockGuardado !== null ? Number(stockGuardado) : stockInicial
  })

  useEffect(() => {
    localStorage.setItem(nombre, stock)
  }, [stock, nombre])

  const disminuirStock = () => {
    if (stock > 0) {
      setStock(stock - 1)
    }
  }

  const esServicio =
    categoria === 'servicios' ||
    nombre.toLowerCase().includes('consulta') ||
    nombre.toLowerCase().includes('peluquería')

  return (
    <div className="card h-100 product-card">
      {imagen && (
        <img
          className="card-img-top"
          src={imagen}
          alt={nombre}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>

        {descripcion && (
          <p className="card-text small text-muted mb-2">
            {descripcion}
          </p>
        )}

        <p className="card-text fw-bold mb-1">
          Precio: ${precio}
        </p>

        <p className="mb-3 text-secondary">
          {esServicio
            ? `Cupos disponibles hoy: ${stock}`
            : `Stock disponible: ${stock}`}
        </p>

        {/* Control de inventario y enlace a detalle */}
        <div className="mb-3 d-flex align-items-center flex-wrap gap-2">
          <div className="btn-group btn-group-sm" role="group" aria-label="Control de inventario">
            <button
              className="btn btn-outline-danger"
              onClick={disminuirStock}
              aria-label="-"
              title="Disminuir existencias"
            >
              -
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => setStock(stock + 1)}
              aria-label="+"
              title="Aumentar existencias"
            >
              +
            </button>
          </div>

          <Link
            to={`/producto/${id}`}
            className="btn btn-sm btn-primary ms-auto"
          >
            Ver detalle
          </Link>
        </div>

        {/* Botón opcional de carrito */}
        {onAgregarCarrito && (
          <div className="mt-auto pt-2 border-top">
            <button
              className="btn btn-outline-primary btn-sm w-100"
              disabled={stock === 0}
              onClick={() => onAgregarCarrito({ id, nombre, precio, imagen, stock })}
            >
              {stock === 0 ? 'Sin Stock' : '🛒 Agregar al carrito'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Producto