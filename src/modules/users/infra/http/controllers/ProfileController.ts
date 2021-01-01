import { Request, Response } from 'express';
import { container } from 'tsyringe';

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

    return response.json(user);
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

    return response.json({
      id: user.id,
      name: user.name,
      nick_name: user.nick_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  }
}
