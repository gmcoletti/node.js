import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
