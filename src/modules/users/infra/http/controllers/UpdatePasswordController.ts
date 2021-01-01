import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EnumStatusCode } from '@shared/errors/AppError';

import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';

interface IUpdateRequest {
  old_password: string;
  password: string;
}

export default class UpdatePasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { old_password, password } = request.body as IUpdateRequest;

    const updatePasswordService = container.resolve(UpdatePasswordService);

    await updatePasswordService.execute({
      user_id: request.user.id,
      old_password,
      password,
    });

    return response.status(EnumStatusCode.NoContent).json();
  }
}
