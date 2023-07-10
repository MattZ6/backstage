import { HttpProtocols } from '@presentation/protocols'

import { HttpResponseHelper } from '../errorDTO'

type Output = HttpProtocols.IResponse<HttpResponseHelper.ErrorDTO>

export function conflict(error: Error): Output {
  return {
    statusCode: 409,
    body: HttpResponseHelper.toErrorDTO(error),
  }
}
