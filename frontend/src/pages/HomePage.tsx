import { useEffect, useState } from 'react'
import { fetchHomeData } from '../api/client'

export default function HomePage() {
  const [title, setTitle] = useState('Carregando...')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    fetchHomeData()
      .then((data) => {
        if (!isActive) {
          return
        }

        setTitle(data.title)
        setMessage(data.message)
      })
      .catch((err: unknown) => {
        if (!isActive) {
          return
        }

        const fallback = 'Falha ao buscar dados da pagina inicial no backend.'
        if (err instanceof Error) {
          setError(`${fallback} ${err.message}`)
          return
        }

        setError(fallback)
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {error ? (
        <p className="mt-4 max-w-xl rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </p>
      ) : (
        <p className="mt-4 text-slate-600">{message}</p>
      )}
    </section>
  )
}
