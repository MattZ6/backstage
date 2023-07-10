import { describe, expect, it } from 'vitest'

import { ApplicationError } from '@domain/errors'

import { makeApplicationErrorMock } from './mocks'

describe('ApplicationError', () => {
  it('should instantiate a ApplicationError with correct values', () => {
    const { message, code, output } = makeApplicationErrorMock()

    expect(output).instanceOf(ApplicationError)
    expect(output.name).toBe('ApplicationError')
    expect(output.message).toBe(message)
    expect(output.code).toBe(code)
    expect(output).toHaveProperty('stack')
  })

  it('should instantiate a ApplicationError without code', () => {
    const { message, output } = makeApplicationErrorMock({ withoutCode: true })

    expect(output).instanceOf(ApplicationError)
    expect(output.name).toBe('ApplicationError')
    expect(output.message).toBe(message)
    expect(output.code).toBe('error')
    expect(output).toHaveProperty('stack')
  })
})
