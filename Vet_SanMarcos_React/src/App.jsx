import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './pages/Productos.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Blogs from './pages/Blogs.jsx'
import BlogDetalle from './pages/BlogDetalle.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Rutas Principales */}
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />

              {/* Rutas dinámicas con useParams (admite /producto/:id y /productos/:id) */}
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />

              {/* Comercio y Usuarios */}
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              {/* Contenido Institucional y Blog */}
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetalle />} />

              {/* Panel de Control con Roles */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          <footer className="site-footer">
            <div className="container">
              <p>
                &copy; 2026 Veterinaria San Marcos. Todos los derechos reservados. |
                Asignatura DSY1104 - Desarrollo Fullstack II (Duoc UC)
              </p>
              <p className="footer-subtext">
                Mauro Santiago · Gabriel González | Dirección: Av. Vicuña Mackenna 491, Santiago | Tel: +56 2 2999 8888
              </p>
            </div>
          </footer>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App