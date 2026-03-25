import type { UserFormFieldErrors, UserFormInput } from '@repo/validation'

export type HelloResponse = {
  message: string
}

export type HomeResponse = {
  title: string
  message: string
}

export type UserFormSuccessResponse = {
  message: string
  data: UserFormInput
}

type UserFormErrorResponse = {
  message?: string
  fieldErrors?: UserFormFieldErrors
}

export class UserFormValidationError extends Error {
  fieldErrors: UserFormFieldErrors

  constructor(message: string, fieldErrors: UserFormFieldErrors) {
    super(message)
    this.name = 'UserFormValidationError'
    this.fieldErrors = fieldErrors
  }
}

async function parseJsonResponse<T>(path: string): Promise<T> {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`Requisicao falhou com status ${response.status}`)
  }

  return (await response.json()) as T
}

export async function fetchHelloMessage(): Promise<HelloResponse> {
  return parseJsonResponse<HelloResponse>('/api/hello')
}

export async function fetchHomeData(): Promise<HomeResponse> {
  return parseJsonResponse<HomeResponse>('/api/home')
}

export async function submitUserForm(data: UserFormInput): Promise<UserFormSuccessResponse> {
  const response = await fetch('/api/user-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as UserFormErrorResponse
    throw new UserFormValidationError(
      payload.message ?? 'Validacao falhou.',
      payload.fieldErrors ?? {},
    )
  }

  return (await response.json()) as UserFormSuccessResponse
}
