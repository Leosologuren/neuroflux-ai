import { useState } from 'react'
import { useStore } from './store'

export function useBPMNAI() {
  const [loading, setLoading] = useState(false)
  const { setNodes } = useStore()

  const callAI = async (prompt: string) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/generate-bpmn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      if (data.nodes) {
        setNodes(data.nodes)
      }
    } catch (error) {
      console.error('Erro ao chamar IA:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    callAI,
    loading,
  }
}
