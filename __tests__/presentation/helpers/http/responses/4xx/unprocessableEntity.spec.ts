import { describe, expect, it } from 'vitest';

import { unprocessableEntity } from '@presentation/helpers';

import { makeApplicationErrorMock } from '../../../../../domain/errors/mocks';

describe('unprocessableEntity', () => {
  it('should return a response object with status code 422', () => {
    const { output: applicationErrorMock } = makeApplicationErrorMock();

    const output = unprocessableEntity(applicationErrorMock);

    expect(output).toEqual({
      statusCode: 422,
      body: {
        code: applicationErrorMock.code,
        message: applicationErrorMock.message,
      },
    });
  });
});
