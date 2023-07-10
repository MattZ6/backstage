import { json } from 'express'
import type { Express } from 'express'

export function setupBodyParser(app: Express) {
  app.use(json())
}
