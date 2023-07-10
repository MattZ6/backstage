import express from 'express'

import { setupHealthCheckEndpoint } from '@main/config/healthCheck'
import { setupMiddlewares } from '@main/config/middlewares'
import { setupRoutes } from '@main/routes'

const app = express()

setupMiddlewares(app)
setupHealthCheckEndpoint(app)
setupRoutes(app)

export { app }
