import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { catalogoProductos } from '../../data/productos'

function AdminDashboard() {
  const { usuario, esAdmin } = useAuth()
  const [tabActiva, setTabActiva] = useState('resumen')

  // Lista de productos administrable con persistencia en localStorage
  const [productos, setProductos] = useState(() => {
    try {
      const guardado = localStorage.getItem('veterinaria_admin_productos')
      return guardado ? JSON.parse(guardado) : catalogoProductos
    } catch {
      return catalogoProductos
    }
  })

  // Lista de usuarios simulada
  const [usuarios] = useState([
    { id: 1, nombre: 'Mauro Santiago', email: 'mauro.admin@veterinaria.cl', rol: 'admin', fecha: '01/10/2026' },
    { id: 2, nombre: 'Gabriel González', email: 'gabriel.admin@veterinaria.cl', rol: 'admin', fecha: '01/10/2026' },
    { id: 3, nombre: 'Camila Rojas', email: 'vendedor@veterinaria.cl', rol: 'vendedor', fecha: '05/10/2026' },
    { id: 4, nombre: 'Juan Pérez', email: 'cliente@correo.cl', rol: 'cliente', fecha: '12/10/2026' },
  ])

  // Formulario nuevo producto
  const [nuevoProd, setNuevoProd] = useState({
    nombre: '',
    categoria: 'farmacia',
    precio: '',
    stockInicial: 10,
    descripcion: '',
  })
  const [mensajeProd, setMensajeProd] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('veterinaria_admin_productos', JSON.stringify(productos))
    } catch {
      // ignore
    }
  }, [productos])

  // Si no está autenticado como admin o vendedor
  if (!usuario || (usuario.rol !== 'admin' && usuario.rol !== 'vendedor')) {
    return (
      <div className="container py-5 text-center">
        <div className="bg-white p-5 rounded shadow-sm border max-w-md mx-auto" style={{ maxWidth: '520px' }}>
          <div className="fs-1 mb-2">🔒</div>
          <h2 className="fw-bold mb-2">Acceso Administrativo Restringido</h2>
          <p className="text-muted mb-4">
            Debes iniciar sesión con una cuenta con rol de <strong>Administrador</strong> o <strong>Vendedor</strong> para acceder a este panel.
          </p>
          <div className="p-3 bg-light rounded text-start small mb-4">
            <strong>Pruébalo con esta cuenta de demostración:</strong>
            <br />
            Correo: <code>admin@veterinaria.cl</code> (o cualquier correo con la palabra <em>admin</em>)
            <br />
            Clave: <code>1234</code>
          </div>
          <Link to="/login" className="btn btn-primary w-100">
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  // Eliminar producto
  const handleEliminarProducto = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto del inventario?')) {
      setProductos((prev) => prev.filter((p) => String(p.id) !== String(id)))
    }
  }

  // Agregar nuevo producto
  const handleAgregarProducto = (e) => {
    e.preventDefault()
    if (!nuevoProd.nombre || !nuevoProd.precio) return

    const nuevo = {
      id: String(Date.now()),
      codigo: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      categoria: nuevoProd.categoria,
      nombre: nuevoProd.nombre,
      precio: nuevoProd.precio,
      precioNumero: Number(nuevoProd.precio.replace(/\./g, '')) || 10000,
      stockInicial: Number(nuevoProd.stockInicial),
      descripcion: nuevoProd.descripcion || 'Producto agregado desde el panel de administración.',
      imagen: '/images/Veterinario1.jpg',
      alt: nuevoProd.nombre,
    }

    setProductos((prev) => [nuevo, ...prev])
    setMensajeProd('¡Producto creado y agregado al inventario con éxito!')
    setNuevoProd({
      nombre: '',
      categoria: 'farmacia',
      precio: '',
      stockInicial: 10,
      descripcion: '',
    })
    setTimeout(() => setMensajeProd(''), 3000)
  }

  return (
    <div className="container py-3">
      {/* Encabezado del Panel */}
      <div className="d-flex flex-wrap justify-content-between align-items-center bg-white p-4 rounded shadow-sm border mb-4">
        <div>
          <span className="badge bg-primary text-uppercase">{usuario.rol}</span>
          <h1 className="h2 fw-bold mb-1">Panel de Control y Gestión</h1>
          <p className="text-muted small mb-0">
            Sesión activa: <strong>{usuario.email}</strong>
          </p>
        </div>

        {/* Pestañas de navegación */}
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button
            className={`btn btn-sm ${tabActiva === 'resumen' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTabActiva('resumen')}
          >
            📊 Resumen
          </button>
          <button
            className={`btn btn-sm ${tabActiva === 'productos' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTabActiva('productos')}
          >
            📦 Productos ({productos.length})
          </button>
          <button
            className={`btn btn-sm ${tabActiva === 'usuarios' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTabActiva('usuarios')}
          >
            👥 Usuarios ({usuarios.length})
          </button>
        </div>
      </div>

      {/* PESTAÑA 1: RESUMEN / MÉTRICAS */}
      {tabActiva === 'resumen' && (
        <div>
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white p-3 rounded shadow-sm border text-center">
                <span className="fs-3 text-primary">💰</span>
                <h4 className="fw-bold mt-2 mb-0">$ 1.450.000</h4>
                <p className="small text-muted mb-0">Ventas del Mes (Simulado)</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white p-3 rounded shadow-sm border text-center">
                <span className="fs-3 text-success">📦</span>
                <h4 className="fw-bold mt-2 mb-0">{productos.length}</h4>
                <p className="small text-muted mb-0">Productos Activos</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white p-3 rounded shadow-sm border text-center">
                <span className="fs-3 text-warning">⚠️</span>
                <h4 className="fw-bold mt-2 mb-0">2</h4>
                <p className="small text-muted mb-0">Alertas de Stock Bajo</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white p-3 rounded shadow-sm border text-center">
                <span className="fs-3 text-info">👥</span>
                <h4 className="fw-bold mt-2 mb-0">{usuarios.length}</h4>
                <p className="small text-muted mb-0">Usuarios Registrados</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm border">
            <h4 className="fw-bold mb-3">Accesos Directos y Operaciones</h4>
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-outline-primary" onClick={() => setTabActiva('productos')}>
                + Agregar Nuevo Producto
              </button>
              <Link to="/productos" className="btn btn-outline-secondary">
                Ver Catálogo Público
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 2: GESTIÓN DE PRODUCTOS */}
      {tabActiva === 'productos' && (
        <div className="row g-4">
          {/* Tabla de Productos */}
          <div className="col-12 col-lg-8">
            <div className="bg-white p-4 rounded shadow-sm border">
              <h4 className="fw-bold mb-3">Inventario Actual</h4>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Código</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      {esAdmin && <th className="text-center">Acciones</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((prod) => (
                      <tr key={prod.id}>
                        <td className="small text-muted">{prod.codigo || prod.id}</td>
                        <td className="fw-semibold">{prod.nombre}</td>
                        <td>
                          <span className="badge bg-secondary">{prod.categoria}</span>
                        </td>
                        <td className="fw-bold text-primary">${prod.precio}</td>
                        <td>
                          <span className={`badge ${prod.stockInicial > 3 ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {prod.stockInicial} un.
                          </span>
                        </td>
                        {esAdmin && (
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleEliminarProducto(prod.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Formulario Crear Producto */}
          {esAdmin && (
            <div className="col-12 col-lg-4">
              <div className="bg-white p-4 rounded shadow-sm border">
                <h4 className="fw-bold mb-3">Nuevo Producto</h4>

                {mensajeProd && (
                  <div className="alert alert-success py-2 px-3 small" role="alert">
                    ✓ {mensajeProd}
                  </div>
                )}

                <form onSubmit={handleAgregarProducto}>
                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Nombre:</label>
                    <input
                      type="text"
                      required
                      className="form-control form-control-sm"
                      placeholder="Ej: Antipulgas Max"
                      value={nuevoProd.nombre}
                      onChange={(e) => setNuevoProd({ ...nuevoProd, nombre: e.target.value })}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label small fw-semibold">Categoría:</label>
                    <select
                      className="form-select form-select-sm"
                      value={nuevoProd.categoria}
                      onChange={(e) => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}
                    >
                      <option value="farmacia">Farmacia</option>
                      <option value="alimentos">Alimentos</option>
                      <option value="servicios">Servicios</option>
                    </select>
                  </div>

                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Precio CLP:</label>
                      <input
                        type="text"
                        required
                        className="form-control form-control-sm"
                        placeholder="Ej: 15.000"
                        value={nuevoProd.precio}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, precio: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Stock Inicial:</label>
                      <input
                        type="number"
                        min="1"
                        className="form-control form-control-sm"
                        value={nuevoProd.stockInicial}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, stockInicial: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Descripción corta:</label>
                    <textarea
                      rows="2"
                      className="form-control form-control-sm"
                      placeholder="Detalle o función del producto..."
                      value={nuevoProd.descripcion}
                      onChange={(e) => setNuevoProd({ ...nuevoProd, descripcion: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm w-100">
                    + Guardar en Inventario
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PESTAÑA 3: GESTIÓN DE USUARIOS Y ROLES */}
      {tabActiva === 'usuarios' && (
        <div className="bg-white p-4 rounded shadow-sm border">
          <h4 className="fw-bold mb-3">Usuarios Registrados y Control de Roles</h4>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Fecha Registro</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td className="fw-semibold">{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          u.rol === 'admin'
                            ? 'bg-danger'
                            : u.rol === 'vendedor'
                            ? 'bg-primary'
                            : 'bg-secondary'
                        }`}
                      >
                        {u.rol.toUpperCase()}
                      </span>
                    </td>
                    <td className="small text-muted">{u.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
