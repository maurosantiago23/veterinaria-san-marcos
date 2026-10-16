import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Producto({
  id = '1',
  nombre = 'Producto',
  precio = '0',
  descripcion,
  imagen,
  alt,
  stockInicial = 5,
  onAgregarCarrito,
}) {
  // Persistencia de stock en localStorage según Guía II (Paso 4) y Pruebas Unitarias
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

  const aumentarStock = () => {
    setStock(stock + 1)
  }

  return (
    <article className="product-card h-100" id={`prod-${id}`}>
      {imagen && (
        <img
          className="card-img-top"
          src={imagen}
          alt={alt || nombre}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{nombre}</h3>
        {descripcion && <p className="product-desc small text-muted">{descripcion}</p>}

        <p className="product-price fw-bold mb-1">Precio: ${precio}</p>
        <p className="mb-2 text-secondary small">Stock disponible: {stock}</p>

        {/* Botones de gestión de stock exigidos por la pauta de pruebas */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="small text-muted me-1">Stock:</span>
          <button
            type="button"
            className="btn btn-sm btn-danger px-3"
            onClick={disminuirStock}
            aria-label="-"
          >
            -
          </button>
          <button
            type="button"
            className="btn btn-sm btn-success px-3"
            onClick={aumentarStock}
            aria-label="+"
          >
            +
          </button>
        </div>

        {/* Acciones principales: Ver Detalle y Agregar al Carrito */}
        <div className="mt-auto d-flex flex-column gap-2">
          <Link
            to={`/producto/${id}`}
            className="btn btn-primary w-100"
          >
            Ver detalle
          </Link>
          {onAgregarCarrito && (
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100"
              disabled={stock === 0}
              onClick={() => onAgregarCarrito({ id, nombre, precio, imagen, stock })}
            >
              {stock === 0 ? 'Sin Stock' : '🛒 Agregar al Carrito'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default Producto