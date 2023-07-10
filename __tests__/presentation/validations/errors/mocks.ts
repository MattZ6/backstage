import { faker } from '@faker-js/faker'

import { ValidationError } from '@presentation/validations/errors'

type Input = {
  withoutValue?: boolean
}

export function makeValidationErrorMock({ withoutValue = false }: Input = {}) {
  const field = faker.database.column()
  const type = faker.database.type()
  const message = faker.lorem.sentence()
  let value = faker.lorem.word()

  if (withoutValue) {
    value = undefined
  }

  const output = new ValidationError(field, type, message, value)

  return {
    field,
    type,
    message,
    value,
    output,
  }
}
