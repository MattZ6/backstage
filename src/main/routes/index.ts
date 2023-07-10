import { Router } from 'express'
import type { Express } from 'express'

const routes = Router()

// Here goes the routes

export function setupRoutes(app: Express) {
  app.use(routes)
}
