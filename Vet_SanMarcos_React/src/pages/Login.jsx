import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    // Reglas de validación exigidas por la Guía II (Paso 9) y Pruebas Unitarias
    if (!email.includes('@')) {
      setError('El correo electrónico no es válido')
      return
    }

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres')
      return
    }

    // Datos válidos: limpiar errores
    setError('')
    const usuarioLogueado = login(email, password)
    setExito(`¡Bienvenido/a, ${usuarioLogueado.nombre}! (Rol: ${usuarioLogueado.rol})`)

    setTimeout(() => {
      if (usuarioLogueado.rol === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }, 1200)
  }

  return (
    <div className="container py-4">
      <div
        className="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto"
        style={{ maxWidth: '480px' }}
      >
        <h1 className="h3 mb-2 text-center fw-bold">Iniciar Sesión</h1>
        <p className="text-muted text-center mb-4 small">
          Ingresa tus credenciales autorizadas para acceder.
        </p>

        {error && (
          <div className="alert alert-danger py-2 px-3 small" role="alert">
            {error}
          </div>
        )}

        {exito && (
          <div className="alert alert-success py-2 px-3 small" role="alert">
            {exito}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Campo Correo Electrónico (id="email" con label htmlFor="email" para pruebas) */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Correo electrónico
            </label>
            <input
              id="email"
              type="text"
              className={`form-control ${error && !email.includes('@') ? 'is-invalid' : ''}`}
              placeholder="usuario@dominio.cl"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* Campo Contraseña (id="password" con label htmlFor="password" para pruebas) */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className={`form-control ${error && password.length < 4 ? 'is-invalid' : ''}`}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="form-text small">
              Mínimo 4 caracteres.
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
          >
            Ingresar
          </button>

          <div className="text-center mt-3 pt-3 border-top">
            <span className="text-muted small">
              ¿No tienes una cuenta aún?{' '}
              <Link to="/registro" className="text-primary fw-semibold text-decoration-none">
                Regístrate aquí
              </Link>
            </span>
          </div>

          {/* Guía rápida de roles simulados para el profesor */}
          <div className="mt-4 p-2 bg-light rounded border text-secondary small">
            <strong>Credenciales de prueba sugeridas:</strong>
            <ul className="mb-0 ps-3 mt-1" style={{ fontSize: '0.8rem' }}>
              <li><strong>Admin:</strong> <code>admin@veterinaria.cl</code> (clave: 1234)</li>
              <li><strong>Vendedor:</strong> <code>vendedor@veterinaria.cl</code> (clave: 1234)</li>
              <li><strong>Cliente:</strong> <code>cliente@correo.cl</code> (clave: 1234)</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login