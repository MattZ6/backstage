import type { ElysiaApp } from '@main/adapters/elysia/types'

import { testRoutes } from './test.route'

export function setupRoutes(app: ElysiaApp) {
  // Here goes the routes

  app.group('/v1/test', (app) => app.use(testRoutes))
}
