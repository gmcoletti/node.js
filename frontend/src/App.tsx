import { Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HelloWorldPage from './pages/HelloWorldPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import UserFormPage from './pages/UserFormPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hello-world" element={<HelloWorldPage />} />
        <Route path="/user-form" element={<UserFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
