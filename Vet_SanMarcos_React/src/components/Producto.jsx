function Producto({ nombre, precio, imagen, alt }) {
  return (
    <article className="card product-card h-100">
      <img className="card-img-top" src={imagen} alt={alt} />
      <div className="card-body d-flex flex-column">
        <h2 className="card-title h5">{nombre}</h2>
        <p className="card-text mt-auto">${precio} CLP</p>
      </div>
    </article>
  )
}

export default Producto