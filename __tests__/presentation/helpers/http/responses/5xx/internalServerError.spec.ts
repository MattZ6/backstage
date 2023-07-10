import { describe, expect, it } from 'vitest';

import { internalServerError } from '@presentation/helpers';

describe('internalServerError', () => {
  it('should return a response object with status code 500', () => {
    const output = internalServerError();

    expect(output).toEqual({
      statusCode: 500,
      body: {
        code: 'internal',
        message: 'Internal server error',
      },
    });
  });
});
