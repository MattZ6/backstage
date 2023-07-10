import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { ok } from '@presentation/helpers'

describe('ok', () => {
  it('should return a response object with status code 200', () => {
    const body = faker.string.sample()

    const output = ok(body)

    expect(output).toEqual({
      statusCode: 200,
      body,
    })
  })
})
