import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        {/* Marca y Logo agrandado */}
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

        {/* Navegación responsiva con estilos activos */}
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
            to="/login"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active' : ''}`
            }
          >
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar