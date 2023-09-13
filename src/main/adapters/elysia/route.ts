import type { LocalHandler, TypedSchema } from 'elysia'

import { IController } from '@presentation/protocols/Controller'

import { CustomElysiaInstance } from './types'

export function adaptRoute(controller: IController) {
  const handler: LocalHandler<
    TypedSchema<never>,
    CustomElysiaInstance
  > = async (context) => {
    const { statusCode, body } = await controller.handle({
      body: context.body ?? {},
      params: context.params ?? {},
      query: context.query ?? {},
      headers: context.headers ?? {},
      user: context.store.user,
      originalUrl: context.path,
      method: context.request.method,
    })

    context.set.status = statusCode

    return body
  }

  return handler
}
