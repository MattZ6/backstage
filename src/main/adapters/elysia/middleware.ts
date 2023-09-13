import type { HookHandler, TypedSchema } from 'elysia'

import { IMiddleware } from '@presentation/protocols'

import { CustomElysiaInstance } from './types'

type Handler = HookHandler<TypedSchema<string>, CustomElysiaInstance, string>

export function adaptMiddleware(middleware: IMiddleware) {
  const handler: Handler = async (context) => {
    const { statusCode, body } = await middleware.handle({
      body: context.body ?? {},
      params: context.params ?? {},
      query: context.query ?? {},
      headers: context.headers ?? {},
      user: context.store.user,
      originalUrl: context.path,
      method: context.request.method,
    })

    const isSuccessful = statusCode >= 200 && statusCode <= 299

    if (!isSuccessful) {
      context.set.status = statusCode

      return body
    }

    Object.assign(context.store, body)
  }

  return handler
}
