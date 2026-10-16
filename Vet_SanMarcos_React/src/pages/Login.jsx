import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Intento de inicio de sesión simulado para: ${email}`)
  }

  return (
    <section className="d-flex justify-content-center align-items-center py-4">
      <div
        className="bg-white p-4 p-md-5 rounded shadow-sm w-100"
        style={{ maxWidth: '480px', border: '1px solid var(--borde)' }}
      >
        <h2 className="mb-2 text-center">Iniciar Sesión</h2>
        <p className="text-muted text-center mb-4">
          Ingresa con tus credenciales autorizadas.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label fw-semibold">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="login-email"
              className="form-control"
              placeholder="nombre@dominio.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="login-password" className="form-label fw-semibold">
              Contraseña:
            </label>
            <input
              type="password"
              id="login-password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Ingresar
          </button>

          <div className="text-center mt-3">
            <span className="text-muted small">
              ¿No tienes cuenta?{' '}
              <span className="text-primary fw-semibold" style={{ cursor: 'pointer' }}>
                Regístrate aquí
              </span>
            </span>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login