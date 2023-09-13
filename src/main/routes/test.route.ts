import Elysia from 'elysia'

import { adaptMiddleware, adaptRoute } from '@main/adapters/elysia'
import { makeTestController } from '@main/factories/controllers/Test'
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication'

const testRoutes = new Elysia()

testRoutes.get('/', adaptRoute(makeTestController()), {
  beforeHandle: [adaptMiddleware(makeAuthenticationMiddleware())],
})

export { testRoutes }
