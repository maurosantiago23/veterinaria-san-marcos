import { Link } from 'react-router-dom'
import { listaBlogs } from '../data/blogs'

function Blogs() {
  return (
    <div className="container py-3">
      <div className="text-center mb-4">
        <span className="eyebrow">Blog & Consejos Veterinarios</span>
        <h1 className="h2 fw-bold mb-2">Artículos para el Cuidado de tu Mascota</h1>
        <p className="text-muted">
          Recomendaciones médicas elaboradas por nuestros especialistas para mantener sanos y felices a tus mejores amigos.
        </p>
      </div>

      <div className="row g-4">
        {listaBlogs.map((articulo) => (
          <div className="col-12 col-md-6" key={articulo.id}>
            <article className="card h-100 shadow-sm border overflow-hidden">
              <img
                src={articulo.imagen}
                alt={articulo.titulo}
                className="card-img-top"
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-primary">{articulo.categoria}</span>
                  <small className="text-muted">{articulo.fecha}</small>
                </div>
                <h3 className="h5 fw-bold mb-2">{articulo.titulo}</h3>
                <p className="text-secondary small mb-3">{articulo.resumen}</p>
                <p className="small text-muted mb-3 fst-italic">Por: {articulo.autor}</p>
                <div className="mt-auto">
                  <Link to={`/blogs/${articulo.id}`} className="btn btn-outline-primary w-100">
                    Leer Artículo Completo →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
