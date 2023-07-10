import { HttpProtocols } from '@presentation/protocols'

import { HttpResponseHelper } from '../errorDTO'

type Output = HttpProtocols.IResponse<HttpResponseHelper.ErrorDTO>

export function internalServerError(): Output {
  return {
    statusCode: 500,
    body: {
      code: 'internal',
      message: 'Internal server error',
    },
  }
}
