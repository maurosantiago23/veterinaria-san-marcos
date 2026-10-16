import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Inicio from './pages/Inicio.jsx'
import Login from './pages/Login.jsx'
import Productos from './pages/Productos.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>
            &copy; 2026 Veterinaria San Marcos. Todos los derechos reservados. |
            Asignatura DSY1104 - Desarrollo Fullstack II
          </p>
          <p className="footer-subtext">
            Dirección: Av. Vicuña Mackenna 491, Santiago | Teléfono: +56 2 2999 8888
          </p>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App