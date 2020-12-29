import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
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

  const usersRepository = new UsersRepository();

  const createUser = new CreateUsersService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    nick_name,
    password,
  });

  return res.json(user);
});

export default router;
