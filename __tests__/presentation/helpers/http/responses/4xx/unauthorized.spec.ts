import { describe, expect, it } from 'vitest';

import { unauthorized } from '@presentation/helpers';

import { makeApplicationErrorMock } from '../../../../../domain/errors/mocks';

describe('unauthorized', () => {
  it('should return a response object with status code 401', () => {
    const { output: applicationErrorMock } = makeApplicationErrorMock();

    const output = unauthorized(applicationErrorMock);

    expect(output).toEqual({
      statusCode: 401,
      body: {
        code: applicationErrorMock.code,
        message: applicationErrorMock.message,
      },
    });
  });
});
