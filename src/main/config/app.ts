import { Elysia } from 'elysia'

import { CustomElysiaInstance } from '@main/adapters/elysia/types'
import { setupHealthCheckEndpoint } from '@main/config/healthCheck'
import { setupMiddlewares } from '@main/config/middlewares'
import { setupRoutes } from '@main/routes'

const app = new Elysia<string, CustomElysiaInstance>({ name: 'Backstage' })

setupHealthCheckEndpoint(app)
setupMiddlewares(app)
setupRoutes(app)

export { app }
