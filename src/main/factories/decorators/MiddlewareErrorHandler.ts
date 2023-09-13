import { IMiddleware } from '@presentation/protocols'

import { MiddlewareErrorHandlerDecorator } from '@main/decorators/MiddlewareErrorHandler'

import { makeErrorsRepository } from '../repositories/Error'

export function makeMiddlewareErrorHandlerDecorator(Middleware: IMiddleware) {
  const errorsRepository = makeErrorsRepository()

  return new MiddlewareErrorHandlerDecorator(Middleware, errorsRepository)
}
