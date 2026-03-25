import { NavLink } from 'react-router-dom'

const baseClassName = 'rounded-md px-3 py-2 text-sm font-medium transition-colors'

export default function Navbar() {
  return (
    <nav aria-label="Navegacao principal" className="flex items-center gap-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseClassName} ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'}`
        }
      >
        Inicio
      </NavLink>
      <NavLink
        to="/hello-world"
        className={({ isActive }) =>
          `${baseClassName} ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'}`
        }
      >
        Ola Mundo
      </NavLink>
      <NavLink
        to="/user-form"
        className={({ isActive }) =>
          `${baseClassName} ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'}`
        }
      >
        Formulario
      </NavLink>
    </nav>
  )
}
