import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Saludo from './Saludo'

describe('Componente Saludo', () => {
  test('muestra el mensaje Hola Mundo', () => {
    render(<Saludo />)
    expect(screen.getByText('Hola Mundo')).toBeInTheDocument()
  })
})
