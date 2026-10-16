import { useState } from 'react'

function Contador({ inicial = 0 }) {
  const [contador, setContador] = useState(inicial)

  return (
    <div className="d-inline-flex align-items-center gap-2">
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => setContador(contador - 1)}
      >
        -
      </button>
      <span className="fw-bold px-2">{contador}</span>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => setContador(contador + 1)}
      >
        +
      </button>
    </div>
  )
}

export default Contador
