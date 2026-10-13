import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark site-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/images/LOGO_SanMarcos.png" alt="" width="42" height="42" />
          <span>Veterinaria San Marcos</span>
        </Link>

        <div className="d-flex flex-wrap gap-2">
          <Link className="btn btn-outline-light" to="/">Inicio</Link>
          <Link className="btn btn-outline-light" to="/productos">Productos</Link>
          <Link className="btn btn-outline-light" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar