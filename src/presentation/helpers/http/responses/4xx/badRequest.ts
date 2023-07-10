import { HttpProtocols } from '@presentation/protocols'
import { ValidationError } from '@presentation/validations/errors'

import { HttpResponseHelper } from '../errorDTO'

type ValidationErrorData = {
  field: string
  type: string
  message: string
  value?: string | number
}

type ValidationErrorDTO = HttpResponseHelper.ErrorDTO & {
  validation: ValidationErrorData
}

type Output = HttpProtocols.IResponse<ValidationErrorDTO>

export function badRequest(error: ValidationError): Output {
  return {
    statusCode: 400,
    body: {
      code: 'validation',
      message: 'Validation error',
      validation: {
        field: error.field,
        type: error.type,
        value: error.value,
        message: error.message,
      },
    },
  }
}
