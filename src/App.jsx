
import { divide, isNull } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import 'react-tree-graph/dist/style.css'
import './App.css'
import Node from './node.component'
import { start, suscribe, unSuscribe } from './tree'
import { validateState } from './util'

const stateType = {
  INITIAL: "INITIAL",
  GOAL: "GOAL",
}

function App() {
  const [initialState, setInitial] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0])
  const [goal, setGoal] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0])
  const [steps, setSteps] = useState([])
  const [isLoading, setLoading] = useState(false)
  const stateStrategy = useMemo(() => ({
    [stateType.INITIAL]: (state) => setInitial(state),
    [stateType.GOAL]: (state) => setGoal(state),
  }), [setInitial, setGoal])


  const handleUpdate = useCallback((strategy) => {
    const result = prompt("Escribe los numeros seguidos: 12345... (usa el 0 para marcar un espacio vacio)")
    if (isNull(result)) return
    validateState(result)
      .then(newState => stateStrategy[strategy](newState))
  }, [stateStrategy])


  const handleStart = useCallback(() => {
    setSteps([])
    setLoading(true)
    start(initialState, goal)
      .catch(() => alert("No hubo solución"))
      .finally(() => setLoading(false))
  }, [initialState, goal, setSteps])

  const addStep = (newStep) => {
    setSteps(steps => [newStep, ...steps])
  }

  useEffect(() => {
    const id = suscribe(addStep)
    return unSuscribe(id)
  }, [addStep])

  return (
    <>
      <section>
        <Node
          state={initialState}
          title="Estado inicial"
        />
        <button onClick={() => handleUpdate(stateType.INITIAL)}>Actualizar</button>
      </section>
      <section>
        <Node
          state={goal}
          title="Estado final esperado"
        />
      </section>
      <main>
        <button onClick={() => handleStart()}>Empezar</button>
        {isLoading ? <div className='solution-section'>Cargando...</div> : (
          <section className='solution-section'>
            <h3>Pasos para la soluci&oacute;n</h3>
            {steps.map(step => (
              <Node
                state={step}
              />
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default App
