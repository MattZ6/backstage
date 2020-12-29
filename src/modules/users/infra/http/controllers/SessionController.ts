import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

interface IPostBodyDTO {
  email: string;
  password: string;
}

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body as IPostBodyDTO;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const auth = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(auth);
  }
}
