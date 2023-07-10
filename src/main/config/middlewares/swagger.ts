import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

import docs from '@main/docs/swagger.json'

export function setupSwagger(app: Express) {
  app.use('/docs', serve, setup(docs))

  app.get('/', (_, res) => res.redirect('/docs'))
}
