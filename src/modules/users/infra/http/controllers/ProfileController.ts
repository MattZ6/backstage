import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

interface IUpdateRequest {
  name: string;
  nick_name: string;
  email: string;
}

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(request.user.id);

    const data = classToClass(user);

    return response.json(data);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, nick_name, email } = request.body as IUpdateRequest;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id: request.user.id,
      name,
      nick_name,
      email,
    });

    const data = classToClass(user);

    return response.json(data);
  }
}
