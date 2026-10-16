import { useState } from 'react'
import Producto from '../components/Producto.jsx'

const catalogoProductos = [
  {
    id: 'SRV-001',
    categoria: 'servicios',
    nombre: 'Consulta Veterinaria General',
    precio: '25.000',
    descripcion: 'Evaluación clínica integral y revisión de constantes vitales.',
    imagen: '/images/Veterinario1.jpg',
    alt: 'Consulta Veterinaria General',
  },
  {
    id: 'FAR-103',
    categoria: 'farmacia',
    nombre: 'Simparica 10-20 kg',
    precio: '21.000',
    descripcion: 'Comprimido masticable para control eficaz de pulgas y garrapatas.',
    imagen: '/images/antiparasitario.jpg',
    alt: 'Simparica Antiparasitario',
  },
  {
    id: 'PRO-201',
    categoria: 'alimentos',
    nombre: 'Alimento Perro Adulto Salmón 3 kg',
    precio: '19.990',
    descripcion: 'Alimento súper premium formulado para razas medianas.',
    imagen: '/images/comida_perro.jpg',
    alt: 'Alimento Perro Adulto Salmón',
  },
  {
    id: 'FAR-104',
    categoria: 'farmacia',
    nombre: 'NexGard Spectra Perros Medianos',
    precio: '23.500',
    descripcion: 'Protección mensual contra parásitos externos e internos.',
    imagen: '/images/antiparasitario.jpg',
    alt: 'NexGard Spectra',
  },
  {
    id: 'PRO-202',
    categoria: 'alimentos',
    nombre: 'Snack Dental Felino 60g',
    precio: '4.990',
    descripcion: 'Premios crujientes diseñados para reducir el sarro dental.',
    imagen: '/images/comida_gato.png',
    alt: 'Snack Dental Gatos',
  },
  {
    id: 'SRV-002',
    categoria: 'servicios',
    nombre: 'Peluquería y Baño Sanitario',
    precio: '18.000',
    descripcion: 'Incluye corte de pelo según raza, baño hipoalergénico y corte de uñas.',
    imagen: '/images/champu.jpg',
    alt: 'Peluquería Canina',
  },
]

function Productos() {
  const [categoriaActual, setCategoriaActual] = useState('todos')

  const productosFiltrados =
    categoriaActual === 'todos'
      ? catalogoProductos
      : catalogoProductos.filter((prod) => prod.categoria === categoriaActual)

  return (
    <section>
      <div className="mb-4 text-center">
        <h2>Catálogo General de Productos y Servicios</h2>
        <p className="text-muted">
          Explora todos nuestros productos disponibles para el cuidado, alimentación y salud de tu mascota.
        </p>

        {/* Filtros de categoría reactivos */}
        <div className="d-flex justify-content-center gap-2 flex-wrap my-4">
          <button
            className={`btn btn-sm ${
              categoriaActual === 'todos' ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => setCategoriaActual('todos')}
          >
            Todos ({catalogoProductos.length})
          </button>
          <button
            className={`btn btn-sm ${
              categoriaActual === 'farmacia' ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => setCategoriaActual('farmacia')}
          >
            Farmacia
          </button>
          <button
            className={`btn btn-sm ${
              categoriaActual === 'alimentos' ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => setCategoriaActual('alimentos')}
          >
            Alimentos
          </button>
          <button
            className={`btn btn-sm ${
              categoriaActual === 'servicios' ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => setCategoriaActual('servicios')}
          >
            Servicios
          </button>
        </div>
      </div>

      {/* Grilla responsiva de productos */}
      <div className="row g-4">
        {productosFiltrados.map((producto) => (
          <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
            <Producto
              id={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              descripcion={producto.descripcion}
              imagen={producto.imagen}
              alt={producto.alt}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Productos