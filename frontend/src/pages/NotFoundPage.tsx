import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Pagina Nao Encontrada</h1>
      <p className="mt-4 text-slate-600">A pagina que voce tentou acessar nao existe.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Ir para o Inicio
      </Link>
    </section>
  )
}
