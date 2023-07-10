import { HttpProtocols } from '@presentation/protocols'

export function ok<T = unknown>(data: T): HttpProtocols.IResponse<T> {
  return {
    statusCode: 200,
    body: data,
  }
}
