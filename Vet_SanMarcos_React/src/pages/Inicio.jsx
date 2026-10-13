import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <section className="container py-5">
      <div className="home-intro">
        <p className="eyebrow">Unidad 2 · React</p>
        <h1>Veterinaria San Marcos</h1>
        <p className="lead">
          Estamos comenzando la versión React de la tienda veterinaria.
        </p>
        <Link className="btn btn-primary" to="/productos">
          Explorar productos
        </Link>
      </div>
    </section>
  )
}

export default Inicio