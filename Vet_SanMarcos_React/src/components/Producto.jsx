import { Link } from 'react-router-dom'

function Producto({ id, nombre, precio, imagen, alt, descripcion }) {
  return (
    <article className="product-card" id={id}>
      <img className="card-img-top" src={imagen} alt={alt || nombre} />
      <div className="card-body">
        <h3 className="card-title">{nombre}</h3>
        {descripcion && <p className="product-desc">{descripcion}</p>}
        <p className="product-price">${precio} CLP</p>
        <Link to={`/productos#${id}`} className="btn btn-secondary mt-auto w-100">
          Ver Detalle
        </Link>
      </div>
    </article>
  )
}

export default Producto