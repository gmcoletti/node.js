import { Request, Response } from 'express'
import { getHomeData } from '../services/home.service'

export function homeController(_req: Request, res: Response) {
  res.json(getHomeData())
}
