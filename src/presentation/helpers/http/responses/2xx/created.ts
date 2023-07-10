import { HttpProtocols } from '@presentation/protocols'

export function created<T = unknown>(data?: T): HttpProtocols.IResponse<T> {
  return {
    statusCode: 201,
    body: data ?? null,
  }
}
