import EnumStatusCode from '@shared/dtos/EnumStatusCode';

class AppError {
  public readonly message: string;

  public readonly statusCode: EnumStatusCode;

  constructor(
    message: string,
    statusCode: EnumStatusCode = EnumStatusCode.BadRequest
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
