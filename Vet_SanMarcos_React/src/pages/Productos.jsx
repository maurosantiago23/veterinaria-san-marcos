import Producto from '../components/Producto.jsx'

const productos = [
  {
    id: 'consulta',
    nombre: 'Consulta Veterinaria General',
    precio: '25.000',
    imagen: '/images/Veterinario1.jpg',
    alt: 'Atención veterinaria para una mascota',
  },
  {
    id: 'antiparasitario',
    nombre: 'Antiparasitario para perros',
    precio: '21.000',
    imagen: '/images/antiparasitario.jpg',
    alt: 'Producto antiparasitario veterinario',
  },
  {
    id: 'alimento',
    nombre: 'Alimento para perro',
    precio: '19.990',
    imagen: '/images/comida_perro.jpg',
    alt: 'Alimento para perro',
  },
]

function Productos() {
  return (
    <section className="container py-5">
      <h1 className="mb-4">Productos y servicios</h1>
      <div className="row g-4">
        {productos.map((producto) => (
          <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
            <Producto
              nombre={producto.nombre}
              precio={producto.precio}
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