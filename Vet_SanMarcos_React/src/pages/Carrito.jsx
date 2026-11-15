import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { boletasApi } from '../services/api'

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

  const { usuario, estaAutenticado } = useAuth()
  const navigate = useNavigate()

  const [estadoCompra, setEstadoCompra] = useState(null) // null | 'exito' | 'fallo'
  const [totalPagado, setTotalPagado] = useState(0)
  const [boletaEmitida, setBoletaEmitida] = useState(null)
  const [alertaLogin, setAlertaLogin] = useState(false)
  const [procesando, setProcesando] = useState(false)
  const [errorVenta, setErrorVenta] = useState('')

  const handleConfirmarCompra = async () => {
    // Si el usuario no ha iniciado sesión, exigir autenticación según feedback docente
    if (!estaAutenticado) {
      setAlertaLogin(true)
      return
    }

    setAlertaLogin(false)
    setErrorVenta('')
    setProcesando(true)

    // Estructurar el payload esperado por Spring Boot (VentaRequest)
    const ventaPayload = {
      idUsuario: usuario?.idUsuario ? Number(usuario.idUsuario) : 1,
      items: carrito.map((item) => ({
        idProducto: Number(item.idProducto || item.id || 1),
        cantidad: Number(item.cantidad),
      })),
    }

    try {
      const data = await boletasApi.crearBoleta(ventaPayload)
      setBoletaEmitida({
        idBoleta: data.idBoleta,
        fechaEmision: data.fechaEmision,
        total: data.total || total,
        nombreCliente: data.nombreCliente || usuario?.nombre,
        emailCliente: data.emailCliente || usuario?.email,
        origen: 'oracle',
      })
      setTotalPagado(total)
      setEstadoCompra('exito')
      vaciarCarrito()
    } catch (err) {
      console.error('Error al emitir boleta en Oracle Cloud:', err)
      setErrorVenta(`Error al procesar la venta: ${err.message}`)
    } finally {
      setProcesando(false)
    }
  }

  const handlePagoFallido = () => {
    if (!estaAutenticado) {
      setAlertaLogin(true)
      return
    }
    setAlertaLogin(false)
    setEstadoCompra('fallo')
  }

  if (estadoCompra === 'exito' && boletaEmitida) {
    const esOracle = boletaEmitida.origen === 'oracle'

    return (
      <div className="container py-5 text-center">
        <div className="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto" style={{ maxWidth: '620px' }}>
          <div className="display-1 text-success mb-3">✓</div>
          <h2 className="fw-bold mb-2 text-success">¡Boleta y Compra Emitidas con Éxito!</h2>
          <p className="text-muted mb-4">
            Muchas gracias por confiar en <strong>Veterinaria San Marcos</strong>. La transacción ha sido registrada y el inventario rebajado en la base de datos.
          </p>

          <div className="alert alert-success py-3 px-4 small text-start mb-4 border-success">
            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
              <strong>Comprobante Oficial de Venta:</strong>
              <span className={`badge ${esOracle ? 'bg-success' : 'bg-secondary'}`}>
                {esOracle ? '● Oracle Cloud ATP 19c' : '○ Simulación Local'}
              </span>
            </div>
            <strong>N° de Boleta Electrónica:</strong> <code>#BOL-{boletaEmitida.idBoleta}</code>
            <br />
            <strong>Fecha de Emisión:</strong> {new Date(boletaEmitida.fechaEmision).toLocaleString('es-CL')}
            <br />
            <strong>Titular:</strong> {boletaEmitida.nombreCliente} ({boletaEmitida.emailCliente})
            <br />
            <strong>Monto Total Cancelado:</strong> <code>${Number(totalPagado).toLocaleString('es-CL')} CLP</code> (IVA 19% incluido)
            <br />
            <strong>Estado de la Orden:</strong> <span className="text-success fw-bold">PAGADO · Stock Actualizado</span>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => {
                setEstadoCompra(null)
                setBoletaEmitida(null)
              }}
            >
              ← Volver al Catálogo
            </button>
            <Link to="/productos?categoria=servicios" className="btn btn-outline-primary px-4 py-2">
              Agendar otra Atención
            </Link>
          </div>
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
            Lo sentimos, tu transacción no ha podido ser procesada por la pasarela de pagos. Por favor verifica los fondos o intenta nuevamente.
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
            Aún no has agregado productos o servicios médicos para tu mascota.
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
      <h2 className="mb-4">Carrito de Compras y Boleta</h2>

      {errorVenta && (
        <div className="alert alert-danger py-2 px-3 small mb-3" role="alert">
          {errorVenta}
        </div>
      )}

      <div className="row g-4">
        {/* Listado de productos */}
        <div className="col-12 col-lg-8">
          <div className="bg-white p-3 p-md-4 rounded shadow-sm border">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Producto / Servicio</th>
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
                              disabled={procesando}
                            >
                              -
                            </button>
                            <span className="input-group-text px-3 bg-white fw-bold">
                              {item.cantidad}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                              disabled={procesando}
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
                            disabled={procesando}
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
                disabled={procesando}
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

            {alertaLogin && (
              <div className="alert alert-warning py-2 px-3 small mb-3 border-warning">
                <strong>🔒 Inicio de sesión requerido:</strong>
                <p className="mb-2 mt-1">
                  Para emitir tu boleta oficial y asociar la atención a tu cuenta, debes iniciar sesión con tu usuario.
                </p>
                <div className="d-flex gap-2">
                  <Link to="/login" className="btn btn-sm btn-primary">
                    Ir a Iniciar Sesión →
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setAlertaLogin(false)}
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}

            <div className="d-grid gap-2 mb-3">
              <button
                className="btn btn-primary py-2 fs-6 fw-semibold"
                onClick={handleConfirmarCompra}
                disabled={procesando}
              >
                {procesando ? '⏳ Emitiendo Boleta en Oracle Cloud...' : '💳 Confirmar y Emitir Boleta'}
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handlePagoFallido}
                disabled={procesando}
              >
                ⚠️ Simular Pago Rechazado (Fallo)
              </button>
            </div>
            <p className="text-center text-muted small m-0">
              🔒 Conectado al Microservicio de Ventas y Boletas de Spring Boot.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrito
