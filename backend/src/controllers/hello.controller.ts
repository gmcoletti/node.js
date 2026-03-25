import { Request, Response } from 'express'
import { getHelloMessage } from '../services/hello.service'

export function helloController(_req: Request, res: Response) {
  res.json(getHelloMessage())
}
