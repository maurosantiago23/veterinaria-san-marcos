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

  const [estadoCompra, setEstadoCompra] = useState(null) // null | 'exito' | 'fallo'
  const [totalPagado, setTotalPagado] = useState(0)

  const handlePagoExitoso = () => {
    setTotalPagado(total)
    setEstadoCompra('exito')
    vaciarCarrito()
  }

  const handlePagoFallido = () => {
    setEstadoCompra('fallo')
  }

  if (estadoCompra === 'exito') {
    return (
      <div className="container py-5 text-center">
        <div className="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto" style={{ maxWidth: '580px' }}>
          <div className="display-1 text-success mb-3">✓</div>
          <h2 className="fw-bold mb-2 text-success">¡Compra simulada con éxito!</h2>
          <p className="text-muted mb-4">
            Muchas gracias por confiar en <strong>Veterinaria San Marcos</strong>. Hemos generado tu orden de compra y enviado el comprobante a tu correo.
          </p>
          <div className="alert alert-success py-2 px-3 small text-start mb-4">
            <strong>Resumen de tu transacción:</strong>
            <br />
            N° de Orden: <code>#VSM-784920</code>
            <br />
            Monto Pagado: <code>${totalPagado.toLocaleString('es-CL')} CLP</code> (IVA 19% incluido)
            <br />
            Estado: <strong>Autorizado por Transbank / Pasarela Web</strong>
          </div>
          <button
            className="btn btn-primary px-4 py-2"
            onClick={() => setEstadoCompra(null)}
          >
            ← Volver a la Tienda
          </button>
        </div>
      </div>
    )
  }

  if (estadoCompra === 'fallo') {
    return (
      <div className="container py-5 text-center">
        <div className="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto" style={{ maxWidth: '580px' }}>
          <div className="display-1 text-danger mb-3">✕</div>
          <h2 className="fw-bold mb-2 text-danger">No se pudo realizar el pago</h2>
          <p className="text-muted mb-4">
            Lo sentimos, tu transacción no ha podido ser procesada por la entidad bancaria. Por favor verifica los fondos de tu cuenta o intenta con otro medio de pago.
          </p>
          <div className="alert alert-danger py-2 px-3 small text-start mb-4">
            <strong>Detalle del error en pasarela:</strong>
            <br />
            Código de rechazo: <code>ERR_TRANS_REJECTED_402</code>
            <br />
            Monto no procesado: <code>${total.toLocaleString('es-CL')} CLP</code>
            <br />
            <em>Tus productos se mantienen guardados intactos en el carrito para que no pierdas tu pedido.</em>
          </div>
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => setEstadoCompra(null)}
            >
              🔄 Reintentar Pago
            </button>
            <Link to="/contacto" className="btn btn-outline-secondary px-4 py-2">
              Contactar a la Clínica
            </Link>
          </div>
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

            <div className="d-grid gap-2 mb-3">
              <button
                className="btn btn-primary py-2 fs-6"
                onClick={handlePagoExitoso}
              >
                💳 Confirmar y Pagar (Simular Éxito)
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handlePagoFallido}
              >
                ⚠️ Simular Pago Rechazado (Fallo)
              </button>
            </div>
            <p className="text-center text-muted small m-0">
              🔒 Simulación de pasarela Webpay / Transbank según pauta.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrito
