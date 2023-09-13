import { app } from '@main/config/app'
import { apiConfig } from '@main/config/env'

function startServer() {
  app.listen({ port: apiConfig.PORT }, ({ hostname, port }) => {
    console.log(`🦊 Server is running in port http://${hostname}:${port}`)
  })
}

startServer()
