import { HttpProtocols } from '@presentation/protocols'

import { HttpResponseHelper } from '../errorDTO'

type Output = HttpProtocols.IResponse<HttpResponseHelper.ErrorDTO>

export function unprocessableEntity(error: Error): Output {
  return {
    statusCode: 422,
    body: HttpResponseHelper.toErrorDTO(error),
  }
}
