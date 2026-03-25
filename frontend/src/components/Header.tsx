import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-slate-900">
          Inicio
        </Link>
        <Navbar />
      </div>
    </header>
  )
}
