import { describe, expect, it } from 'vitest'

import { notFound } from '@presentation/helpers'

import { makeApplicationErrorMock } from '../../../../../domain/errors/mocks'

describe('notFound', () => {
  it('should return a response object with status code 404', () => {
    const { output: applicationErrorMock } = makeApplicationErrorMock()

    const output = notFound(applicationErrorMock)

    expect(output).toEqual({
      statusCode: 404,
      body: {
        code: applicationErrorMock.code,
        message: applicationErrorMock.message,
      },
    })
  })
})
