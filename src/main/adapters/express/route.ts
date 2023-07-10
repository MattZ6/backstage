import type { Request, Response } from 'express'

import { IController } from '@presentation/protocols/Controller'

export function adaptRoute(controller: IController) {
  return async (request: Request, response: Response): Promise<Response> => {
    const { statusCode, body } = await controller.handle({
      body: request.body ?? {},
      params: request.params ?? {},
      query: request.query ?? {},
      headers: request.headers ?? {},
      user: request.user,
      originalUrl: request.originalUrl,
      method: request.method,
    })

    return response.status(statusCode).json(body)
  }
}
