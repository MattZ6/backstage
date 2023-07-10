import { describe, expect, it } from 'vitest';

import { conflict } from '@presentation/helpers';

import { makeApplicationErrorMock } from '../../../../../domain/errors/mocks';

describe('conflict', () => {
  it('should return a response object with status code 409', () => {
    const { output: applicationErrorMock } = makeApplicationErrorMock();

    const output = conflict(applicationErrorMock);

    expect(output).toEqual({
      statusCode: 409,
      body: {
        code: applicationErrorMock.code,
        message: applicationErrorMock.message,
      },
    });
  });
});
