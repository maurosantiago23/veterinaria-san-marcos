import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem('veterinaria_user')
      return guardado ? JSON.parse(guardado) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('veterinaria_user', JSON.stringify(usuario))
    } else {
      localStorage.removeItem('veterinaria_user')
    }
  }, [usuario])

  const login = (email, _password) => {
    let rol = 'cliente'
    const emailLower = email.toLowerCase()

    if (emailLower.includes('admin') || emailLower.includes('profesor')) {
      rol = 'admin'
    } else if (emailLower.includes('vendedor')) {
      rol = 'vendedor'
    }

    const nuevoUsuario = {
      email,
      nombre: email.split('@')[0],
      rol,
    }
    setUsuario(nuevoUsuario)
    return nuevoUsuario
  }

  const logout = () => {
    setUsuario(null)
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: !!usuario,
        esAdmin: usuario?.rol === 'admin',
        login,
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
