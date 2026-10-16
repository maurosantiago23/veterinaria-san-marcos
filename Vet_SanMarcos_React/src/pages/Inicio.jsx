import { Link } from 'react-router-dom'
import Producto from '../components/Producto.jsx'

const productosDestacados = [
  {
    id: 'SRV-001',
    nombre: 'Consulta Veterinaria General',
    precio: '25.000',
    descripcion: 'Evaluación clínica integral y revisión de constantes vitales.',
    imagen: '/images/Veterinario1.jpg',
    alt: 'Consulta Veterinaria General',
  },
  {
    id: 'FAR-103',
    nombre: 'Simparica 10-20 kg',
    precio: '21.000',
    descripcion: 'Comprimido masticable para control eficaz de pulgas y garrapatas.',
    imagen: '/images/antiparasitario.jpg',
    alt: 'Simparica Antiparasitario',
  },
  {
    id: 'PRO-201',
    nombre: 'Alimento Perro Adulto Salmón 3 kg',
    precio: '19.990',
    descripcion: 'Alimento súper premium formulado para razas medianas.',
    imagen: '/images/comida_perro.jpg',
    alt: 'Alimento Perro Adulto Salmón',
  },
]

function Inicio() {
  return (
    <>
      {/* Banner de bienvenida (Hero) */}
      <section className="hero-section">
        <div className="hero-text">
          <h2>Bienvenidos a Veterinaria San Marcos</h2>
          <p>
            Ofrecemos atención médica veterinaria de excelencia, peluquería
            profesional y un completo pet shop con alimentos y medicamentos para
            asegurar la salud y felicidad de tus mejores amigos.
          </p>
          <Link className="btn btn-primary" to="/productos">
            Ver Catálogo de Productos
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="/images/Mascotas.jpg"
            alt="Mascotas atendidas por Veterinaria San Marcos"
            className="img-fluid"
          />
        </div>
      </section>

      {/* Sección de productos destacados */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <h2>Productos y Servicios Destacados</h2>
          <p className="text-muted">
            Una muestra de lo que puedes encontrar en nuestra clínica y farmacia veterinaria.
          </p>
        </div>

        <div className="row g-4">
          {productosDestacados.map((prod) => (
            <div className="col-12 col-md-6 col-lg-4" key={prod.id}>
              <Producto
                id={prod.id}
                nombre={prod.nombre}
                precio={prod.precio}
                descripcion={prod.descripcion}
                imagen={prod.imagen}
                alt={prod.alt}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Referencias */}
      <section className="references-section">
        <h3>Referencias de Interés y Enlaces Relacionados</h3>
        <ul>
          <li>
            <a
              href="https://www.colegiomedicoveterinario.cl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colegio Médico Veterinario de Chile
            </a>
          </li>
          <li>
            <a
              href="https://www.sag.cl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Servicio Agrícola y Ganadero (SAG)
            </a>
          </li>
          <li>
            <a
              href="https://developer.mozilla.org/es/docs/Web/HTML"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentación Oficial HTML5 - MDN Web Docs
            </a>
          </li>
        </ul>
      </section>

      {/* Sección de Video */}
      <section className="video-section">
        <h2>Mascotas y bienestar animal</h2>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/ybN5qdpvrko?si=Y0getmfdYRDmW3Xl"
            title="Video de bienestar animal - Veterinaria San Marcos"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>
    </>
  )
}

export default Inicio