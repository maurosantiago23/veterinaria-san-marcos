import { useState } from 'react'

const regionesYComunas = {
  'Metropolitana de Santiago': ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'Puente Alto', 'Ñuñoa'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'],
  'Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante', 'Coronel'],
}

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    region: 'Metropolitana de Santiago',
    comuna: 'Santiago',
    asunto: 'Consulta General',
    mensaje: '',
  })

  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'region') {
        updated.comuna = regionesYComunas[value] ? regionesYComunas[value][0] : ''
      }
      return updated
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        region: 'Metropolitana de Santiago',
        comuna: 'Santiago',
        asunto: 'Consulta General',
        mensaje: '',
      })
    }, 4000)
  }

  return (
    <div className="container py-3">
      <div className="row g-4">
        {/* Formulario de Contacto */}
        <div className="col-12 col-lg-7">
          <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
            <h2 className="fw-bold mb-2">Envíanos un Mensaje</h2>
            <p className="text-muted small mb-4">
              ¿Dudas sobre algún tratamiento, disponibilidad de fármacos o agendamiento de horas? Escríbenos.
            </p>

            {enviado && (
              <div className="alert alert-success py-2 px-3 small" role="alert">
                ✓ ¡Mensaje enviado con éxito! Un médico veterinario te responderá a la brevedad.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre y Apellido:</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  className="form-control"
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Correo Electrónico:</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control"
                    placeholder="tucorreo@dominio.cl"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Teléfono Celular:</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="form-control"
                    placeholder="+56 9 8888 7777"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Selector dinámico de Región y Comuna */}
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

              <div className="mb-3">
                <label className="form-label fw-semibold">Asunto de Contacto:</label>
                <select
                  name="asunto"
                  className="form-select"
                  value={formData.asunto}
                  onChange={handleChange}
                >
                  <option value="Consulta General">Consulta General / Información</option>
                  <option value="Agendamiento de Hora">Agendamiento de Consulta Médica</option>
                  <option value="Peluquería Canina">Reserva de Peluquería y Baño</option>
                  <option value="Farmacia y Stock">Disponibilidad de Medicamentos</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Tu Mensaje o Consulta:</label>
                <textarea
                  name="mensaje"
                  rows="4"
                  required
                  className="form-control"
                  placeholder="Detalla cómo podemos ayudarte o la condición de tu mascota..."
                  value={formData.mensaje}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        {/* Tarjetas de Información de Contacto */}
        <div className="col-12 col-lg-5">
          <div className="bg-white p-4 rounded shadow-sm border mb-4">
            <h4 className="fw-bold mb-3">Datos de Atención</h4>
            <ul className="list-unstyled text-secondary mb-0">
              <li className="mb-3 d-flex align-items-start gap-2">
                <span className="fs-5">📍</span>
                <div>
                  <strong>Dirección Central:</strong>
                  <br />
                  Av. Vicuña Mackenna 491, Santiago, Chile.
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start gap-2">
                <span className="fs-5">📞</span>
                <div>
                  <strong>Central Telefónica:</strong>
                  <br />
                  +56 2 2999 8888 / +56 9 8765 4321
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start gap-2">
                <span className="fs-5">✉️</span>
                <div>
                  <strong>Correo Electrónico:</strong>
                  <br />
                  contacto@veterinariosanmarcos.cl
                </div>
              </li>
              <li className="d-flex align-items-start gap-2">
                <span className="fs-5">🕒</span>
                <div>
                  <strong>Horario Continuado:</strong>
                  <br />
                  Lunes a Viernes: 08:30 a 20:00 hrs.
                  <br />
                  Sábados y Domingos: 09:00 a 18:00 hrs.
                  <br />
                  <span className="badge bg-danger mt-1">Urgencias Médicas: 24/7</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow-sm border text-center">
            <h5 className="fw-bold mb-2">¿Necesitas Atención Inmediata?</h5>
            <p className="small text-secondary mb-3">
              Si tu mascota presenta síntomas de riesgo vital (trauma, asfixia o convulsiones), no esperes respuesta de formulario y acude directamente a nuestro centro.
            </p>
            <a href="tel:+56229998888" className="btn btn-outline-danger w-100">
              🚨 Llamar a Urgencias (24h)
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
