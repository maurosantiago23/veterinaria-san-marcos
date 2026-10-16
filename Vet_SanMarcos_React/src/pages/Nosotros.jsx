import { Link } from 'react-router-dom'

function Nosotros() {
  return (
    <div className="container py-3">
      {/* Sección Quiénes Somos */}
      <section className="bg-white p-4 p-md-5 rounded shadow-sm border mb-4">
        <span className="eyebrow">Sobre Nosotros</span>
        <h1 className="h2 fw-bold mb-3">Clínica Veterinaria San Marcos</h1>
        <p className="lead text-secondary mb-4">
          Más de una década brindando medicina veterinaria basada en la ciencia, la empatía y el amor incondicional por los animales.
        </p>
        <p className="text-secondary">
          Fundada en Santiago de Chile, <strong>Veterinaria San Marcos</strong> nació con la misión de transformar la experiencia clínica de las mascotas y sus familias humanas. Contamos con modernas instalaciones equipadas para diagnósticos rápidos, quirófano de alta complejidad, laboratorio clínico interno y farmacia especializada.
        </p>
      </section>

      {/* Misión y Visión */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <div className="bg-white p-4 rounded shadow-sm border h-100">
            <h3 className="h5 fw-bold text-primary mb-2">🎯 Nuestra Misión</h3>
            <p className="text-secondary mb-0">
              Proteger la salud y promover el bienestar integral de cada mascota mediante atención médica de excelencia, diagnóstico preciso y educación continua para tutores responsables.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="bg-white p-4 rounded shadow-sm border h-100">
            <h3 className="h5 fw-bold text-primary mb-2">👁️ Nuestra Visión</h3>
            <p className="text-secondary mb-0">
              Consolidarnos como el centro veterinario referente a nivel regional por nuestra calidez humana, ética profesional y adopción de tecnologías médicas de vanguardia.
            </p>
          </div>
        </div>
      </div>

      {/* Equipo Médico */}
      <section className="bg-white p-4 p-md-5 rounded shadow-sm border">
        <h2 className="text-center fw-bold mb-4">Equipo Médico Profesional</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6 text-center">
            <div className="p-3 border rounded h-100">
              <img
                src="/images/Veterinario1.jpg"
                alt="Dr. Gabriel González"
                className="rounded-circle mb-3 border p-1"
                width="140"
                height="140"
                style={{ objectFit: 'cover' }}
              />
              <h4 className="h5 fw-bold mb-1">Dr. Gabriel González</h4>
              <p className="text-primary small fw-semibold mb-2">Médico Veterinario · Cirugía & Odontología</p>
              <p className="small text-secondary mb-0">
                Especialista en procedimientos quirúrgicos y profilaxis dental avanzada con más de 8 años de trayectoria clínica.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 text-center">
            <div className="p-3 border rounded h-100">
              <img
                src="/images/Veterinario2.jpg"
                alt="Dr. Mauro Santiago"
                className="rounded-circle mb-3 border p-1"
                width="140"
                height="140"
                style={{ objectFit: 'cover' }}
              />
              <h4 className="h5 fw-bold mb-1">Dr. Mauro Santiago</h4>
              <p className="text-primary small fw-semibold mb-2">Médico Veterinario · Medicina Interna</p>
              <p className="small text-secondary mb-0">
                Coordinador del área clínica y prevención epidemiológica, enfocado en medicina felina y geriátrica canina.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 pt-3 border-top">
          <Link to="/contacto" className="btn btn-primary px-4 py-2">
            Contáctanos y Agenda tu Hora
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Nosotros
