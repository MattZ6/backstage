import { describe, expect, it } from 'vitest'

import { noContent } from '@presentation/helpers'

describe('noContent', () => {
  it('should return a response object with status code 204', () => {
    const output = noContent()

    expect(output).toEqual({ statusCode: 204 })
    expect(output).not.haveOwnProperty('body')
  })
})
