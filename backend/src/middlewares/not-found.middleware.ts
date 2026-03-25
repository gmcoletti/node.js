import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/app-error'

export function notFoundMiddleware(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(`Rota nao encontrada: ${req.method} ${req.originalUrl}`, 404))
}
