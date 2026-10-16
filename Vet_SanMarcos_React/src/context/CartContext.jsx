import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('veterinaria_cart')
      return guardado ? JSON.parse(guardado) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('veterinaria_cart', JSON.stringify(carrito))
    } catch {
      // Ignorar errores de cuota o modo incógnito
    }
  }, [carrito])

  const agregarProducto = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const index = prev.findIndex((item) => String(item.id) === String(producto.id))
      // Parsear precio numérico si viene como string
      const precioNum =
        producto.precioNumero ||
        Number(String(producto.precio).replace(/\./g, '').replace(',', '.')) ||
        0

      if (index >= 0) {
        const nuevo = [...prev]
        nuevo[index] = {
          ...nuevo[index],
          cantidad: nuevo[index].cantidad + cantidad,
        }
        return nuevo
      }
      return [
        ...prev,
        {
          id: String(producto.id),
          nombre: producto.nombre,
          precio: producto.precio,
          precioNumero: precioNum,
          imagen: producto.imagen || '/images/Veterinario1.jpg',
          cantidad,
        },
      ]
    })
  }

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => String(item.id) !== String(id)))
  }

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(id)
      return
    }
    setCarrito((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, cantidad: nuevaCantidad } : item
      )
    )
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const subtotal = carrito.reduce((acc, item) => acc + item.precioNumero * item.cantidad, 0)
  const iva = Math.round(subtotal * 0.19)
  const total = subtotal + iva

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        vaciarCarrito,
        totalItems,
        subtotal,
        iva,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider')
  }
  return context
}
