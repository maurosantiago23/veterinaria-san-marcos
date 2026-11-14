/**
 * Cliente de API centralizado para la comunicación entre React y Spring Boot.
 * Detecta automáticamente la URL del backend según el entorno (Localhost o AWS EC2).
 */

const getBaseUrl = () => {
  // 1. Variable de entorno explicita (si esta configurada)
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  // 2. Detección automática segun el hostname  ( localhost o ip publica de la EC2)
  if (typeof window !== 'undefined' && window.location?.hostname) {
    return `http://${window.location.hostname}:8080/api/v1`
  }
  // 3. Fallback por defecto
  return 'http://localhost:8080/api/v1'
}

export const API_BASE_URL = getBaseUrl()

/**
 * Obtiene el token JWT almacenado en localStorage
 */
export const obtenerToken = () => {
  try {
    const usuarioGuardado = localStorage.getItem('veterinaria_user')
    if (usuarioGuardado) {
      const parsed = JSON.parse(usuarioGuardado)
      return parsed?.token || null
    }
  } catch (err) {
    console.error('Error leyendo token de localStorage:', err)
  }
  return null
}

/**
 * Función genérica de petición HTTP con inyección de JWT y manejo de errores
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  const token = obtenerToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  const response = await fetch(url, config)

  // Intentar parsear la respuesta como JSON
  let data = null
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json()
    } catch {
      data = null
    }
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    const errorMsg =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      (typeof data === 'string' && data) ||
      `Error HTTP ${response.status}: ${response.statusText}`
    const error = new Error(errorMsg)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

/**
 * Normaliza un producto proveniente de la API (Oracle) o del catálogo local
 * para que sea 100% compatible con todos los componentes de React.
 */
export const normalizarProducto = (item) => {
  if (!item) return null
  const catNombre = (item.categoria?.nombre || item.categoria || '').toLowerCase()
  const precioNum = typeof item.precio === 'number' ? item.precio : Number(item.precio) || 0
  const stockVal = item.stock !== undefined ? item.stock : (item.stockInicial !== undefined ? item.stockInicial : 0)

  return {
    id: String(item.idProducto || item.id || ''),
    idProducto: item.idProducto ? Number(item.idProducto) : (Number(item.id) || null),
    codigo: item.codigo || `PRD-${item.idProducto || item.id}`,
    nombre: item.nombre || '',
    descripcion: item.descripcion || '',
    precio: precioNum.toLocaleString('es-CL'),
    precioNumero: precioNum,
    stock: stockVal,
    stockInicial: stockVal,
    imagen: item.imagenUrl || item.imagen || '/images/Veterinario1.jpg',
    imagenUrl: item.imagenUrl || item.imagen || '/images/Veterinario1.jpg',
    alt: item.nombre || 'Producto',
    categoria: catNombre,
    categoriaOriginal: item.categoria,
    caracteristicas: item.caracteristicas || [
      'Producto o atención médica certificada',
      'Garantía de calidad Clínica Veterinaria San Marcos',
    ],
  }
}

/**
 * Servicios de Productos y Catálogo
 */
export const productosApi = {
  obtenerTodos: () => apiRequest('/productos'),
  obtenerPorId: (id) => apiRequest(`/productos/${id}`),
  obtenerPorCategoria: (categoria) => apiRequest(`/productos/categoria/${encodeURIComponent(categoria)}`),
}

/**
 * Servicios de Autenticación (Login y Registro)
 */
export const authApi = {
  login: (email, password) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  registro: (nombre, email, password, telefono = '') =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password, telefono }),
    }),
  obtenerUsuarios: () => apiRequest('/auth/usuarios'),
}

/**
 * Servicios de Ventas y Boletas
 */
export const boletasApi = {
  crearBoleta: (ventaRequest) =>
    apiRequest('/boletas', {
      method: 'POST',
      body: JSON.stringify(ventaRequest),
    }),
  obtenerTodas: () => apiRequest('/boletas'),
  obtenerPorId: (id) => apiRequest(`/boletas/${id}`),
  obtenerPorUsuario: (idUsuario) => apiRequest(`/boletas/usuario/${idUsuario}`),
}

export default {
  API_BASE_URL,
  apiRequest,
  productosApi,
  authApi,
  boletasApi,
}
