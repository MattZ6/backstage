import cors from 'cors'
import type { Express } from 'express'

export function setupCors(app: Express) {
  /**
   * Its important to add the origin param to cors configuration.
   */

  app.use(cors())
}
