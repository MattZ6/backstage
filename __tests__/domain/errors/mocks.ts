import { faker } from '@faker-js/faker'

import { ApplicationError, DomainError } from '@domain/errors'

export function makeDomainErrorMock() {
  const message = faker.lorem.sentence()
  const code = faker.database.type()

  const output = new DomainError(message, code)

  return {
    message,
    code,
    output,
  }
}

type MakeApplicationErrorMockInput = {
  withoutCode?: boolean
}

export function makeApplicationErrorMock({
  withoutCode = false,
}: MakeApplicationErrorMockInput = {}) {
  const message = faker.lorem.sentence()
  let code = faker.database.type()

  if (withoutCode) {
    code = undefined
  }

  const output = new ApplicationError(message, code)

  return {
    message,
    code,
    output,
  }
}
