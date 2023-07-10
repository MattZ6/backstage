import { ApplicationError } from '@domain/errors'

export class ValidationError extends ApplicationError {
  public field: string
  public type: string
  public value: string | number | null

  constructor(
    field: string,
    type: string,
    message: string,
    value: string | number = null,
  ) {
    super(message, 'validation')

    super.name = this.constructor.name
    this.field = field
    this.type = type
    this.value = value
  }
}
