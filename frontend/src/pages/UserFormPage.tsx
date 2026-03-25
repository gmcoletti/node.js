import { useState } from 'react'
import type { FormEvent } from 'react'
import { toUserFormFieldErrors, userFormSchema } from '@repo/validation'
import type { UserFormFieldErrors, UserFormInput } from '@repo/validation'
import { submitUserForm, UserFormValidationError } from '../api/client'

const initialFormData: UserFormInput = {
  email: '',
  name: '',
  dateOfBirth: '',
}

export default function UserFormPage() {
  const [formData, setFormData] = useState<UserFormInput>(initialFormData)
  const [fieldErrors, setFieldErrors] = useState<UserFormFieldErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [disableFrontendValidation, setDisableFrontendValidation] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(null)

    if (!disableFrontendValidation) {
      const parsed = userFormSchema.safeParse(formData)
      if (!parsed.success) {
        setFieldErrors(toUserFormFieldErrors(parsed.error))
        return
      }
    }

    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const response = await submitUserForm(formData)
      setSubmitSuccess(response.message)
      setFormData(initialFormData)
    } catch (error: unknown) {
      if (error instanceof UserFormValidationError) {
        setFieldErrors(error.fieldErrors)
        setSubmitError(error.message)
      } else if (error instanceof Error) {
        setSubmitError(error.message)
      } else {
        setSubmitError('Algo deu errado ao enviar o formulario.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold tracking-tight">Formulario de Usuario</h1>
      <p className="mt-2 text-slate-600">
        Esta pagina valida usando o schema Zod compartilhado no frontend e backend.
      </p>

      <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
        <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <input
            type="checkbox"
            checked={disableFrontendValidation}
            onChange={(event) => setDisableFrontendValidation(event.target.checked)}
            className="h-4 w-4 accent-slate-900"
          />
          <span className="text-sm text-slate-700">
            Desativar validacao do frontend (enviar direto ao backend)
          </span>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">E-mail</span>
          <input
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((current) => ({ ...current, email: event.target.value }))
            }
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-0 focus:border-slate-500"
            placeholder="voce@exemplo.com"
          />
          {fieldErrors.email ? (
            <span className="text-sm text-red-700">{fieldErrors.email[0]}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Nome</span>
          <input
            type="text"
            value={formData.name}
            onChange={(event) =>
              setFormData((current) => ({ ...current, name: event.target.value }))
            }
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-0 focus:border-slate-500"
            placeholder="Maria Silva"
          />
          {fieldErrors.name ? (
            <span className="text-sm text-red-700">{fieldErrors.name[0]}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Data de Nascimento</span>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(event) =>
              setFormData((current) => ({ ...current, dateOfBirth: event.target.value }))
            }
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-0 focus:border-slate-500"
          />
          {fieldErrors.dateOfBirth ? (
            <span className="text-sm text-red-700">{fieldErrors.dateOfBirth[0]}</span>
          ) : null}
        </label>

        <div className="mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>

      {submitError ? (
        <p className="mt-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700">
          {submitError}
        </p>
      ) : null}

      {submitSuccess ? (
        <p className="mt-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-green-700">
          {submitSuccess}
        </p>
      ) : null}
    </section>
  )
}
