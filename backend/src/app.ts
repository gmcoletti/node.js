import express from 'express'
import pinoHttp from 'pino-http'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { notFoundMiddleware } from './middlewares/not-found.middleware'
import { logger } from './lib/logger'
import routes from './routes/routes'

const app = express()

app.use(pinoHttp({ logger }))
app.use(express.json())
app.use('/api', routes)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
