import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Inicio from './pages/Inicio.jsx'
import Login from './pages/Login.jsx'
import Productos from './pages/Productos.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>Veterinaria San Marcos | DSY1104 - Desarrollo Fullstack II</p>
      </footer>
    </BrowserRouter>
  )
}

export default App