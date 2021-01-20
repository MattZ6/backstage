import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EnumStatusCode from '@shared/dtos/EnumStatusCode';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

interface IPostBodyDTO {
  email: string;
}

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body as IPostBodyDTO;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(EnumStatusCode.NoContent).json();
  }
}
