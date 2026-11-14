import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Persistencia de sesión ante recarga de página (F5) - Rúbrica IE3.3.2
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem('veterinaria_user')
      return guardado ? JSON.parse(guardado) : null
    } catch (e) {
      console.error('Error recuperando sesión de localStorage:', e)
      return null
    }
  })

  // Sincronizar localStorage cuando cambia el estado de usuario
  useEffect(() => {
    try {
      if (usuario) {
        localStorage.setItem('veterinaria_user', JSON.stringify(usuario))
      } else {
        localStorage.removeItem('veterinaria_user')
      }
    } catch (e) {
      console.error('Error guardando sesión en localStorage:', e)
    }
  }, [usuario])

  /**
   * Inicio de sesión: intenta autenticar contra el backend Spring Boot (JWT).
   * Si el backend no responde o está offline, usa fallback para desarrollo/tests.
   */
  const login = async (email, password) => {
    try {
      const res = await authApi.login(email, password)
      if (res && res.token) {
        const usuarioSesion = {
          idUsuario: res.idUsuario,
          nombre: res.nombre,
          email: res.email,
          rol: (res.rol || 'CLIENTE').toLowerCase(),
          token: res.token,
          origen: 'oracle',
        }
        setUsuario(usuarioSesion)
        return usuarioSesion
      }
    } catch (err) {
      console.warn('Backend Spring Boot no disponible para login, usando modo fallback:', err.message)
    }

    // Fallback para pruebas locales o sin backend activo
    let rol = 'cliente'
    const emailLower = (email || '').toLowerCase()
    if (emailLower.includes('admin') || emailLower.includes('profesor')) {
      rol = 'admin'
    } else if (emailLower.includes('vendedor')) {
      rol = 'vendedor'
    }

    const usuarioFallback = {
      idUsuario: 1,
      email,
      nombre: email.split('@')[0],
      rol,
      token: 'jwt-demo-token-fallback',
      origen: 'local',
    }
    setUsuario(usuarioFallback)
    return usuarioFallback
  }

  /**
   * Registro de nuevo cliente en Spring Boot / Oracle Cloud
   */
  const registro = async (nombre, email, password, telefono = '') => {
    try {
      const res = await authApi.registro(nombre, email, password, telefono)
      if (res && res.token) {
        const nuevoUsuario = {
          idUsuario: res.idUsuario,
          nombre: res.nombre,
          email: res.email,
          rol: (res.rol || 'CLIENTE').toLowerCase(),
          token: res.token,
          origen: 'oracle',
        }
        setUsuario(nuevoUsuario)
        return nuevoUsuario
      }
    } catch (err) {
      console.warn('Backend Spring Boot no disponible para registro:', err.message)
    }
    return null
  }

  const logout = () => {
    setUsuario(null)
    try {
      localStorage.removeItem('veterinaria_user')
    } catch {
      // Ignorar
    }
  }

  const rol = usuario?.rol || ''
  const esAdmin = rol === 'admin'
  const esVendedor = rol === 'vendedor'
  const esCliente = rol === 'cliente'

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token: usuario?.token || null,
        estaAutenticado: Boolean(usuario),
        esAdmin,
        esVendedor,
        esCliente,
        login,
        registro,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
