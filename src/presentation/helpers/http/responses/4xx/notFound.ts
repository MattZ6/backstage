import { HttpProtocols } from '@presentation/protocols'

import { HttpResponseHelper } from '../errorDTO'

type Output = HttpProtocols.IResponse<HttpResponseHelper.ErrorDTO>

export function notFound(error: Error): Output {
  return {
    statusCode: 404,
    body: HttpResponseHelper.toErrorDTO(error),
  }
}
