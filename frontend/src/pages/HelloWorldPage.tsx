import { useEffect, useState } from 'react'
import { fetchHelloMessage } from '../api/client'

export default function HelloWorldPage() {
  const [message, setMessage] = useState('Carregando...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    fetchHelloMessage()
      .then((data) => {
        if (isActive) {
          setMessage(data.message)
        }
      })
      .catch((err: unknown) => {
        if (!isActive) {
          return
        }

        const fallback = 'Falha ao buscar mensagem de ola mundo no backend.'
        if (err instanceof Error) {
          setError(`${fallback} ${err.message}`)
        } else {
          setError(fallback)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold tracking-tight">Pagina Ola Mundo</h1>
      {error ? (
        <p className="mt-6 max-w-xl rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </p>
      ) : (
        <p className="mt-6 text-xl text-slate-700">{message}</p>
      )}
    </section>
  )
}
