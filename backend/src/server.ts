import app from './app'

const port = Number(process.env.PORT) || 3001

const server = app.listen(port, () => {
  console.log(`Backend escutando em http://localhost:${port}`)
})

let isShuttingDown = false
const shutdownTimeoutMs = 10_000

function gracefulShutdown(signal: NodeJS.Signals) {
  if (isShuttingDown) {
    return
  }

  isShuttingDown = true
  console.log(`[shutdown] Sinal ${signal} recebido. Encerrando servidor...`)

  const forceExitTimer = setTimeout(() => {
    console.error('[shutdown] Tempo limite excedido. Encerrando processo a forca.')
    process.exit(1)
  }, shutdownTimeoutMs)

  forceExitTimer.unref()

  server.close((error) => {
    clearTimeout(forceExitTimer)

    if (error) {
      console.error('[shutdown] Erro ao encerrar servidor:', error)
      process.exit(1)
      return
    }

    console.log('[shutdown] Servidor encerrado com sucesso.')
    process.exit(0)
  })
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

process.on('uncaughtException', (error) => {
  console.error('[fatal] Excecao nao tratada:', error)
  gracefulShutdown('SIGTERM')
})

process.on('unhandledRejection', (reason) => {
  console.error('[fatal] Promessa rejeitada sem tratamento:', reason)
  gracefulShutdown('SIGTERM')
})
