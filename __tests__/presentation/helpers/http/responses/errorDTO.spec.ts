import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { HttpResponseHelper } from '@presentation/helpers/http/responses/errorDTO'

import { makeApplicationErrorMock } from '../../../../domain/errors/mocks'

describe('HttpResponseHelper', () => {
  it('should return a ErrorDTO from default Error object', () => {
    const error = new Error(faker.string.sample())

    const output = HttpResponseHelper.toErrorDTO(error)

    expect(output).toEqual({
      code: 'internal',
      message: error.message,
    })
  })

  it('should return a ErrorDTO from ApplicationError object', () => {
    const { output: error } = makeApplicationErrorMock()

    const output = HttpResponseHelper.toErrorDTO(error)

    expect(output).toEqual({
      code: error.code,
      message: error.message,
    })
  })
})
