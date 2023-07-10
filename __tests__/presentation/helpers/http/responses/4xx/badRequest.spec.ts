import { describe, expect, it } from 'vitest'

import { badRequest } from '@presentation/helpers'

import { makeValidationErrorMock } from '../../../../validations/errors/mocks'

describe('badRequest', () => {
  it('should return a response object with status code 400', () => {
    const { output: validationErrorMock } = makeValidationErrorMock()

    const output = badRequest(validationErrorMock)

    expect(output).toEqual({
      statusCode: 400,
      body: {
        code: 'validation',
        message: 'Validation error',
        validation: {
          field: validationErrorMock.field,
          type: validationErrorMock.type,
          message: validationErrorMock.message,
          value: validationErrorMock.value,
        },
      },
    })
  })
})
