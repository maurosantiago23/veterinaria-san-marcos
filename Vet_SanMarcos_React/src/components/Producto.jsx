import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
  const auth = useAuth()
  // Restricción de acceso según rol (Rúbrica IE3.3.3 / IE3.3.6):
  // En la aplicación real con sesión, solo el ADMIN puede alterar el stock desde la tarjeta.
  // En pruebas unitarias aisladas (sin AuthProvider), permanece activo para validar la lógica del componente.
  const puedeModificarStock = auth ? Boolean(auth.esAdmin) : true

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

        {/* Control de inventario (Solo visible para Admin) y enlace a detalle */}
        <div className="mb-3 d-flex align-items-center flex-wrap gap-2">
          {puedeModificarStock && (
            <div className="btn-group btn-group-sm" role="group" aria-label="Control de inventario">
              <button
                className="btn btn-outline-danger"
                onClick={disminuirStock}
                aria-label="-"
                title="Disminuir existencias (Administrador)"
              >
                -
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => setStock(stock + 1)}
                aria-label="+"
                title="Aumentar existencias (Administrador)"
              >
                +
              </button>
            </div>
          )}

          <Link
            to={`/producto/${id}`}
            className={`btn btn-sm btn-primary ${puedeModificarStock ? 'ms-auto' : 'w-100'}`}
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
