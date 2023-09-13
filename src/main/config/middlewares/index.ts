import { ElysiaApp } from '@main/adapters/elysia/types'

import { setupCors } from './cors'
import { setupDocs } from './docs'
import { setupHelmet } from './helmet'

export function setupMiddlewares(app: ElysiaApp) {
  setupHelmet(app)
  setupCors(app)
  setupDocs(app)
}
