import { ok } from '@presentation/helpers'
import { HttpProtocols, IMiddleware } from '@presentation/protocols'

import { makeMiddlewareErrorHandlerDecorator } from '../decorators/MiddlewareErrorHandler'

class AuthenticationMiddleware implements IMiddleware {
  async handle(_: HttpProtocols.IRequest): Promise<HttpProtocols.IResponse> {
    return ok({ user: { id: 'xxx-1' } })
  }
}

export function makeAuthenticationMiddleware() {
  const middleware = new AuthenticationMiddleware()

  return makeMiddlewareErrorHandlerDecorator(middleware)
}
