import { ICreateErrorRepository } from '@application/protocols/repositories/error'

import { internalServerError } from '@presentation/helpers/http'
import { HttpProtocols, IMiddleware } from '@presentation/protocols'

export class MiddlewareErrorHandlerDecorator implements IMiddleware {
  constructor(
    private readonly middleware: IMiddleware,
    private readonly createErrorRepository: ICreateErrorRepository,
  ) {}

  async handle(
    request: HttpProtocols.IRequest,
  ): Promise<HttpProtocols.IResponse> {
    try {
      const response = await this.middleware.handle(request)

      return response
    } catch (error) {
      this.createErrorRepository
        .create({
          stack: error?.stack ?? 'NO STACK PROVIDED',
          exception_was_thrown_in: this.middleware.constructor.name,
          resource_url: request.originalUrl,
          http_method: request.method,
        })
        .then(() => console.log('[middleware]: error successfully registered'))
        .catch(() => console.log('[middleware]: fail to register the error'))

      return internalServerError()
    }
  }
}
