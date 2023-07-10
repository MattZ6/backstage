import { describe, expect, it } from 'vitest'

import { PresentationError } from '@presentation/errors'

describe('PresentationError', () => {
  it('should instantiate a PresentationError with correct values', () => {
    const message = 'just a fake message'
    const code = 'just a fake code'

    const output = new PresentationError(message, code)

    expect(output).instanceOf(PresentationError)
    expect(output.name).toBe('PresentationError')
    expect(output.message).toBe(message)
    expect(output.code).toBe(code)
    expect(output).toHaveProperty('stack')
  })
})
