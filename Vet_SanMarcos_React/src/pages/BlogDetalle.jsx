import { useParams, Link } from 'react-router-dom'
import { listaBlogs } from '../data/blogs'

function BlogDetalle() {
  const { id } = useParams()
  const articulo = listaBlogs.find((b) => String(b.id) === String(id) || b.slug === id)

  if (!articulo) {
    return (
      <div className="container py-5 text-center">
        <h2>Artículo no encontrado</h2>
        <p className="text-muted">La publicación solicitada no existe o ha sido movida.</p>
        <Link to="/blogs" className="btn btn-primary mt-3">
          ← Volver a Blogs
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/blogs" className="text-decoration-none">Blogs</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {articulo.titulo}
          </li>
        </ol>
      </nav>

      <article className="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto" style={{ maxWidth: '820px' }}>
        <span className="badge bg-primary mb-2">{articulo.categoria}</span>
        <h1 className="h2 fw-bold text-dark mb-3">{articulo.titulo}</h1>

        <div className="d-flex flex-wrap justify-content-between text-muted small border-bottom pb-3 mb-4">
          <span>✍️ {articulo.autor}</span>
          <span>📅 {articulo.fecha}</span>
        </div>

        <img
          src={articulo.imagen}
          alt={articulo.titulo}
          className="img-fluid rounded mb-4 w-100"
          style={{ maxHeight: '380px', objectFit: 'cover' }}
        />

        <div className="article-body text-secondary" style={{ lineHeight: '1.8' }}>
          {articulo.contenido.map((parrafo, idx) => (
            <p key={idx} className="mb-3">
              {parrafo}
            </p>
          ))}
        </div>

        <div className="mt-5 pt-4 border-top d-flex justify-content-between align-items-center">
          <Link to="/blogs" className="btn btn-outline-secondary">
            ← Volver a todos los artículos
          </Link>
          <Link to="/contacto" className="btn btn-primary">
            Agendar Consulta Preventiva
          </Link>
        </div>
      </article>
    </div>
  )
}

export default BlogDetalle
