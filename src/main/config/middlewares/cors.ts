import { cors } from '@elysiajs/cors'

import type { ElysiaApp } from '@main/adapters/elysia/types'

export function setupCors(app: ElysiaApp) {
  /**
   * Its important to add the origin param to cors configuration.
   */

  app.use(cors())
}
