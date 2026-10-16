import { render, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Producto from './Producto'

describe('Componente Producto', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('muestra el nombre y precio del producto', () => {
    render(
      <MemoryRouter>
        <Producto nombre="Notebook Lenovo" precio="599.990" />
      </MemoryRouter>
    )
    expect(screen.getByText('Notebook Lenovo')).toBeInTheDocument()
    expect(screen.getByText('Precio: $599.990')).toBeInTheDocument()
  })

  test('muestra el stock inicial en 5', () => {
    render(
      <MemoryRouter>
        <Producto nombre="Notebook Lenovo" precio="599.990" />
      </MemoryRouter>
    )
    expect(screen.getByText('Stock disponible: 5')).toBeInTheDocument()
  })

  test('el botón + aumenta el stock', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Producto nombre="Notebook Lenovo" precio="599.990" />
      </MemoryRouter>
    )
    const botonAumentar = screen.getByRole('button', { name: '+' })
    await user.click(botonAumentar)
    expect(screen.getByText('Stock disponible: 6')).toBeInTheDocument()
  })

  test('el botón - disminuye el stock', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Producto nombre="Notebook Lenovo" precio="599.990" />
      </MemoryRouter>
    )
    const botonDisminuir = screen.getByRole('button', { name: '-' })
    await user.click(botonDisminuir)
    expect(screen.getByText('Stock disponible: 4')).toBeInTheDocument()
  })

  test('el stock no puede ser negativo', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Producto nombre="Notebook Lenovo" precio="599.990" />
      </MemoryRouter>
    )
    const botonDisminuir = screen.getByRole('button', { name: '-' })
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    await user.click(botonDisminuir)
    expect(screen.getByText('Stock disponible: 0')).toBeInTheDocument()
  })
})
