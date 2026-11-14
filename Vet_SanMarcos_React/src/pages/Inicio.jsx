import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Producto from '../components/Producto.jsx'
import { catalogoProductos } from '../data/productos'
import { useCart } from '../context/CartContext'
import { productosApi, normalizarProducto } from '../services/api'

function Inicio() {
  const { agregarProducto } = useCart()
  const [productosDestacados, setProductosDestacados] = useState(() =>
    catalogoProductos.slice(0, 3).map(normalizarProducto)
  )

  useEffect(() => {
    let cancelado = false

    async function cargarDestacados() {
      try {
        const data = await productosApi.obtenerTodos()
        if (!cancelado && Array.isArray(data) && data.length > 0) {
          setProductosDestacados(data.slice(0, 3).map(normalizarProducto))
        }
      } catch {
        // Respaldo local
      }
    }

    cargarDestacados()

    return () => {
      cancelado = true
    }
  }, [])

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
            Una muestra de lo que puedes encontrar en nuestra clínica y farmacia veterinaria sincronizada con Oracle Cloud.
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
                categoria={prod.categoria}
                onAgregarCarrito={(p) => agregarProducto(p, 1)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Banner de Servicios Clínicos */}
      <section className="bg-light p-4 rounded-3 border mb-5">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="fw-bold text-primary mb-2">¿Necesitas una consulta médica para tu mascota?</h3>
            <p className="mb-0 text-muted">
              Contamos con médicos veterinarios disponibles y box de atención equipado para consultas generales, vacunas y procedimientos.
            </p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <Link to="/productos?categoria=servicios" className="btn btn-primary btn-lg">
              Ver Cupos Disponibles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Inicio
