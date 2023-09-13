import { describe, expect, it } from 'bun:test'

import { DomainError } from '@domain/errors'

import { makeDomainErrorMock } from './mocks'

describe('DomainError', () => {
  it('should instantiate a DomainError with correct values', () => {
    const { message, code, output } = makeDomainErrorMock()

    expect(output).toBeInstanceOf(DomainError)
    expect(output.name).toBe('DomainError')
    expect(output.message).toBe(message)
    expect(output.code).toBe(code)
    expect(output).toHaveProperty('stack')
  })
})
