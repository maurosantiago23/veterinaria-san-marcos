import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const regionesYComunas = {
  'Metropolitana de Santiago': ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'Puente Alto', 'Ñuñoa'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'],
  'Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante', 'Coronel'],
}

function Registro() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    region: 'Metropolitana de Santiago',
    comuna: 'Santiago',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false,
  })

  const [errores, setErrores] = useState({})
  const [registroExitoso, setRegistroExitoso] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }
      // Si cambia la región, resetear la comuna a la primera de la lista
      if (name === 'region') {
        updated.comuna = regionesYComunas[value] ? regionesYComunas[value][0] : ''
      }
      return updated
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = {}

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre completo es obligatorio.'
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      nuevosErrores.email = 'Ingresa un correo electrónico válido.'
    }

    if (formData.password.length < 4) {
      nuevosErrores.password = 'La contraseña debe tener al menos 4 caracteres.'
    }

    if (formData.password !== formData.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.'
    }

    if (!formData.aceptaTerminos) {
      nuevosErrores.aceptaTerminos = 'Debes aceptar los términos y condiciones.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    setErrores({})
    setRegistroExitoso(true)

    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  return (
    <div className="container py-4">
      <div
        className="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto"
        style={{ maxWidth: '580px' }}
      >
        <h2 className="text-center fw-bold mb-2">Crear Cuenta de Cliente</h2>
        <p className="text-muted text-center mb-4 small">
          Regístrate para agendar consultas, comprar productos y acumular puntos San Marcos.
        </p>

        {registroExitoso && (
          <div className="alert alert-success py-2 px-3 small" role="alert">
            ✓ ¡Cuenta creada con éxito! Redirigiendo a Iniciar Sesión...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre Completo:</label>
            <input
              type="text"
              name="nombre"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              placeholder="Ej: Mauro Santiago"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errores.email ? 'is-invalid' : ''}`}
              placeholder="nombre@correo.cl"
              value={formData.email}
              onChange={handleChange}
            />
            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Teléfono de Contacto:</label>
            <input
              type="tel"
              name="telefono"
              className="form-control"
              placeholder="+56 9 1234 5678"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          {/* Región y Comuna Dinámicas */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Región:</label>
              <select
                name="region"
                className="form-select"
                value={formData.region}
                onChange={handleChange}
              >
                {Object.keys(regionesYComunas).map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Comuna:</label>
              <select
                name="comuna"
                className="form-select"
                value={formData.comuna}
                onChange={handleChange}
              >
                {regionesYComunas[formData.region].map((com) => (
                  <option key={com} value={com}>
                    {com}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contraseñas */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Contraseña:</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                placeholder="Mínimo 4 caracteres"
                value={formData.password}
                onChange={handleChange}
              />
              {errores.password && <div className="invalid-feedback">{errores.password}</div>}
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Confirmar Contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${errores.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Repite la contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errores.confirmPassword && (
                <div className="invalid-feedback">{errores.confirmPassword}</div>
              )}
            </div>
          </div>

          {/* Términos y condiciones */}
          <div className="form-check mb-4">
            <input
              type="checkbox"
              id="aceptaTerminos"
              name="aceptaTerminos"
              className={`form-check-input ${errores.aceptaTerminos ? 'is-invalid' : ''}`}
              checked={formData.aceptaTerminos}
              onChange={handleChange}
            />
            <label htmlFor="aceptaTerminos" className="form-check-label small text-secondary">
              Acepto los términos de servicio y políticas de privacidad de Veterinaria San Marcos.
            </label>
            {errores.aceptaTerminos && (
              <div className="invalid-feedback d-block">{errores.aceptaTerminos}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Registrarme
          </button>

          <div className="text-center mt-3 pt-3 border-top">
            <span className="text-muted small">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                Inicia sesión aquí
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registro
