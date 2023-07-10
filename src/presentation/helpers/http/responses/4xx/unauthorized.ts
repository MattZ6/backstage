import { HttpProtocols } from '@presentation/protocols'

import { HttpResponseHelper } from '../errorDTO'

type Output = HttpProtocols.IResponse<HttpResponseHelper.ErrorDTO>

export function unauthorized(error: Error): Output {
  return {
    statusCode: 401,
    body: HttpResponseHelper.toErrorDTO(error),
  }
}
