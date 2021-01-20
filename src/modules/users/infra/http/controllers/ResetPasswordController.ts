import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EnumStatusCode from '@shared/dtos/EnumStatusCode';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

interface IPostBodyDTO {
  token: string;
  password: string;
}

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body as IPostBodyDTO;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      token,
      password,
    });

    return response.status(EnumStatusCode.NoContent).json();
  }
}
