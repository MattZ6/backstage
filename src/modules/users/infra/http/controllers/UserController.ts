import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUsersService from '@modules/users/services/CreateUserService';

interface IPostBodyDTO {
  name: string;
  nick_name: string;
  email: string;
  password: string;
}

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, nick_name, email, password } = request.body as IPostBodyDTO;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
      name,
      email,
      nick_name,
      password,
    });

    const data = classToClass(user);

    return response.json(data);
  }
}
