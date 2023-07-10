import { ICreateErrorRepository } from '@application/protocols/repositories/error'

import { internalServerError } from '@presentation/helpers'
import { IController, HttpProtocols } from '@presentation/protocols'

export class ControllerErrorHandlerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly createErrorRepository: ICreateErrorRepository,
  ) {}

  async handle(
    request: HttpProtocols.IRequest,
  ): Promise<HttpProtocols.IResponse> {
    try {
      const response = await this.controller.handle(request)

      return response
    } catch (error) {
      this.createErrorRepository
        .create({
          stack: error?.stack ?? 'NO STACK PROVIDED',
          exception_was_thrown_in: this.controller.constructor.name,
          resource_url: request.originalUrl,
          http_method: request.method,
        })
        .then(() => console.log('[controller]: error successfully registered'))
        .catch(() => console.log('[controller]: fail to register the error'))

      return internalServerError()
    }
  }
}
