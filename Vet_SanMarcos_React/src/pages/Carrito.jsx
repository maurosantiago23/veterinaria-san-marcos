import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Carrito() {
  const {
    carrito,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
    subtotal,
    iva,
    total,
  } = useCart()

  const [compraRealizada, setCompraRealizada] = useState(false)

  const handleFinalizarCompra = () => {
    setCompraRealizada(true)
    vaciarCarrito()
  }

  if (compraRealizada) {
    return (
      <div className="container py-5 text-center">
        <div className="bg-white p-5 rounded shadow-sm border max-w-lg mx-auto">
          <div className="display-1 text-success mb-3">✓</div>
          <h2 className="fw-bold mb-2">¡Compra simulada con éxito!</h2>
          <p className="text-muted mb-4">
            Muchas gracias por confiar en <strong>Veterinaria San Marcos</strong>. Hemos generado tu orden de compra y enviado el comprobante a tu correo.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setCompraRealizada(false)}
          >
            ← Volver a la Tienda
          </button>
        </div>
      </div>
    )
  }

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="bg-white p-5 rounded shadow-sm border">
          <h2 className="mb-3">Tu carrito está vacío 🛒</h2>
          <p className="text-muted mb-4">
            Aún no has agregado productos o servicios para tu mascota.
          </p>
          <Link to="/productos" className="btn btn-primary">
            Explorar Catálogo de Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-3">
      <h2 className="mb-4">Carrito de Compras</h2>

      <div className="row g-4">
        {/* Listado de productos */}
        <div className="col-12 col-lg-8">
          <div className="bg-white p-3 p-md-4 rounded shadow-sm border">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col" className="text-center">Precio</th>
                    <th scope="col" className="text-center" style={{ minWidth: '130px' }}>Cantidad</th>
                    <th scope="col" className="text-end">Subtotal</th>
                    <th scope="col" className="text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => {
                    const subtotalItem = item.precioNumero * item.cantidad
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              className="rounded border p-1"
                              width="52"
                              height="52"
                              style={{ objectFit: 'contain' }}
                            />
                            <div>
                              <Link
                                to={`/producto/${item.id}`}
                                className="fw-bold text-decoration-none text-dark d-block"
                              >
                                {item.nombre}
                              </Link>
                              <span className="small text-muted">ID: {item.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-center fw-semibold text-secondary">
                          ${item.precio}
                        </td>
                        <td className="text-center">
                          <div className="input-group input-group-sm justify-content-center">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                            >
                              -
                            </button>
                            <span className="input-group-text px-3 bg-white fw-bold">
                              {item.cantidad}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-end fw-bold text-primary">
                          ${subtotalItem.toLocaleString('es-CL')}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar producto"
                            onClick={() => eliminarProducto(item.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
              <Link to="/productos" className="btn btn-outline-secondary btn-sm">
                ← Continuar Comprando
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={vaciarCarrito}
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>

        {/* Resumen del Pedido (Subtotal, IVA, Total) */}
        <div className="col-12 col-lg-4">
          <div className="bg-white p-4 rounded shadow-sm border">
            <h4 className="fw-bold mb-3 border-bottom pb-2">Resumen de Compra</h4>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal Neto:</span>
              <span className="fw-semibold">${subtotal.toLocaleString('es-CL')} CLP</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">IVA (19%):</span>
              <span className="fw-semibold">${iva.toLocaleString('es-CL')} CLP</span>
            </div>

            <div className="d-flex justify-content-between border-top pt-3 mb-4">
              <span className="fs-5 fw-bold text-dark">Total a Pagar:</span>
              <span className="fs-5 fw-bold text-primary">
                ${total.toLocaleString('es-CL')} CLP
              </span>
            </div>

            <button
              className="btn btn-primary w-100 py-2 fs-6 mb-2"
              onClick={handleFinalizarCompra}
            >
              Confirmar y Pagar
            </button>
            <p className="text-center text-muted small m-0">
              🔒 Pago protegido con simulación local segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrito
