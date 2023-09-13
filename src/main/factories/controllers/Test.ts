import { ok } from '@presentation/helpers'
import { HttpProtocols, IController } from '@presentation/protocols'

import { makeControllerErrorHandlerDecorator } from '../decorators/ControllerErrorHandler'

class TestController implements IController {
  async handle(_: HttpProtocols.IRequest): Promise<HttpProtocols.IResponse> {
    throw new Error('Batata doce')

    return ok({ ok: true })
  }
}

export function makeTestController() {
  const controller = new TestController()

  return makeControllerErrorHandlerDecorator(controller)
}
