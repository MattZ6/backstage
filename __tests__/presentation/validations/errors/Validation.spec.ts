import { describe, expect, it } from 'vitest';

import { ValidationError } from '@presentation/validations/errors';

import { makeValidationErrorMock } from './mocks';

describe('ValidationError', () => {
  it('should instantiate a ValidationError with correct values', () => {
    const { field, type, message, value, output } = makeValidationErrorMock();

    expect(output).instanceOf(ValidationError);
    expect(output.name).toBe('ValidationError');
    expect(output.code).toBe('validation');
    expect(output.field).toBe(field);
    expect(output.type).toBe(type);
    expect(output.message).toBe(message);
    expect(output.value).toBe(value);
    expect(output).toHaveProperty('stack');
  });

  it('should instantiate a ValidationError without value', () => {
    const { field, type, message, output } = makeValidationErrorMock({
      withoutValue: true,
    });

    expect(output).instanceOf(ValidationError);
    expect(output.name).toBe('ValidationError');
    expect(output.code).toBe('validation');
    expect(output.field).toBe(field);
    expect(output.type).toBe(type);
    expect(output.message).toBe(message);
    expect(output.value).toBeNull();
    expect(output).toHaveProperty('stack');
  });
});
