import { UserFormInput } from '@repo/validation'

export function processUserForm(data: UserFormInput) {
  return {
    message: 'Formulario enviado com sucesso.',
    data,
  }
}
