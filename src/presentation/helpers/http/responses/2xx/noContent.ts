import { HttpProtocols } from '@presentation/protocols'

export function noContent(): HttpProtocols.IResponse<void> {
  return {
    statusCode: 204,
  }
}
