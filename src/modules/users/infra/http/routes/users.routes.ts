import { Router } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUserService';

const router = Router();

interface IPostBody {
  name: string;
  nick_name: string;
  email: string;
  password: string;
}

router.post('', async (req, res) => {
  const { name, nick_name, email, password } = req.body as IPostBody;

  const createUser = container.resolve(CreateUsersService);

  const user = await createUser.execute({
    name,
    email,
    nick_name,
    password,
  });

  return res.json(user);
});

export default router;
