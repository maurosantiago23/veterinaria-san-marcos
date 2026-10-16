import { Link } from 'react-router-dom'
import Producto from '../components/Producto.jsx'
import { catalogoProductos } from '../data/productos'
import { useCart } from '../context/CartContext'

function Inicio() {
  const { agregarProducto } = useCart()
  const productosDestacados = catalogoProductos.slice(0, 3)

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
          <div className="d-flex flex-wrap gap-2">
            <Link className="btn btn-primary" to="/productos">
              Ver Catálogo de Productos
            </Link>
            <Link className="btn btn-outline-primary" to="/contacto">
              Agendar Atención Médica
            </Link>
          </div>
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
                stockInicial={prod.stockInicial}
                onAgregarCarrito={(p) => agregarProducto(p, 1)}
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
              Colegio Médico Veterinario de Chile (COLMEVET)
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