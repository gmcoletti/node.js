import { userFormSchema, toUserFormFieldErrors } from '@repo/validation'
import { Request, Response } from 'express'
import { processUserForm } from '../services/user-form.service'

export function submitUserFormController(req: Request, res: Response) {
  const parsed = userFormSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      message: 'Validacao falhou.',
      fieldErrors: toUserFormFieldErrors(parsed.error),
    })
    return
  }

  res.status(200).json(processUserForm(parsed.data))
}
