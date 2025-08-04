// src/App.tsx
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [templates, setTemplates] = useState<any[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from('process_templates').select('*')
      if (error) {
        console.error('Erro ao buscar dados:', error.message)
      } else {
        setTemplates(data || [])
      }
    }

    fetchTemplates()
  }, [])

  return (
    <div>
      <h1>Templates de Processos</h1>
      <ul>
        {templates.map((template, idx) => (
          <li key={idx}>
            <strong>{template.name}</strong><br />
            Criado em: {new Date(template.created_at).toLocaleString('pt-BR')}
            Descrição: {template.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

