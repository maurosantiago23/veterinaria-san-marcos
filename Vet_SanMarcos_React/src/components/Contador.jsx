import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function Contador() {
  const [contador, setContador] = useState(0)

  return (
    <div>
      <hr />
      <h2>Contador: {contador}</h2>
      <Button onClick={() => setContador(contador + 1)} variant="warning">
        Aumentar
      </Button>
    </div>
  )
}

export default Contador
