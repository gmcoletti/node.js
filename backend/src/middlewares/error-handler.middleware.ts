import { ErrorRequestHandler } from 'express'
import { AppError } from '../errors/app-error'

export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, _next) => {
  const appError =
    error instanceof AppError ? error : new AppError('Erro interno do servidor.', 500)

  req.log.error({ err: error }, 'Erro durante o processamento da requisicao')

  res.status(appError.statusCode).json({
    message: appError.message,
    ...(appError.details ? { details: appError.details } : {}),
  })
}
