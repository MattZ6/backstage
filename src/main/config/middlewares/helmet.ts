import { helmet } from 'elysia-helmet'

import type { ElysiaApp } from '@main/adapters/elysia/types'

export function setupHelmet(app: ElysiaApp) {
  app.use(helmet())
}
