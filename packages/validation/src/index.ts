import { ZodError, z } from 'zod'

const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/

function isValidDateOfBirth(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    Number.isFinite(year) &&
    Number.isFinite(month) &&
    Number.isFinite(day) &&
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

export const userFormSchema = z.object({
  email: z.string().trim().email('Por favor, informe um e-mail valido.'),
  name: z
    .string()
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres.')
    .max(100, 'O nome deve ter no maximo 100 caracteres.'),
  dateOfBirth: z
    .string()
    .trim()
    .regex(dateOfBirthRegex, 'A data de nascimento deve estar no formato YYYY-MM-DD.')
    .refine(isValidDateOfBirth, 'A data de nascimento deve ser uma data valida.'),
})

export type UserFormInput = z.infer<typeof userFormSchema>

export type UserFormFieldErrors = Partial<Record<keyof UserFormInput, string[]>>

export function toUserFormFieldErrors(error: ZodError<UserFormInput>): UserFormFieldErrors {
  const fieldErrors = error.flatten().fieldErrors

  return {
    email: fieldErrors.email,
    name: fieldErrors.name,
    dateOfBirth: fieldErrors.dateOfBirth,
  }
}
