import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { totalItems } = useCart()
  const { usuario, estaAutenticado, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
        {/* Marca y Logo Agrandado */}
        <NavLink className="brand-wrapper" to="/">
          <img
            src="/images/LOGO_SanMarcos.png"
            alt="Logo Veterinaria San Marcos"
            className="site-logo"
          />
          <div className="brand-text">
            <span className="site-title">Veterinaria San Marcos</span>
            <span className="site-subtitle">
              Cuidado integral para tu mascota · Salud & Bienestar
            </span>
          </div>
        </NavLink>

        {/* Menú de Navegación Completo con NavLink */}
        <nav className="nav-pills-custom">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active' : ''}`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active' : ''}`
            }
          >
            Productos
          </NavLink>

          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active' : ''}`
            }
          >
            Nosotros
          </NavLink>

          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active' : ''}`
            }
          >
            Blogs
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active' : ''}`
            }
          >
            Contacto
          </NavLink>

          {/* Carrito con Contador Dinámico */}
          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `nav-link-custom position-relative ${isActive ? 'active' : ''}`
            }
          >
            🛒 Carrito
            {totalItems > 0 && (
              <span className="badge bg-danger rounded-pill ms-1">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Estado de Autenticación */}
          {estaAutenticado ? (
            <div className="d-flex align-items-center gap-2 ms-lg-2">
              <Link
                to="/admin"
                className="btn btn-sm btn-outline-warning text-white"
                title="Panel de Administración"
              >
                Panel {usuario.rol === 'admin' ? 'Admin' : 'Vendedor'}
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-outline-light"
                onClick={handleLogout}
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2 ms-lg-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? 'active' : ''}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/registro"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? 'active' : ''}`
                }
              >
                Registro
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar