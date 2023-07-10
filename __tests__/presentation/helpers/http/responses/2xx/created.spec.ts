import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

import { created } from '@presentation/helpers'

describe('created', () => {
  it('should return a response object with status code 201', () => {
    const body = faker.string.sample()

    const output = created(body)

    expect(output).toEqual({
      statusCode: 201,
      body,
    })
  })

  it('should return a response object without body', () => {
    const output = created()

    expect(output).toEqual({ statusCode: 201, body: null })
  })
})
