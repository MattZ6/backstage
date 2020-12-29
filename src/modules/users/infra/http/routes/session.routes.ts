import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const router = Router();

interface IPostBody {
  email: string;
  password: string;
}

router.post('', async (req, res) => {
  const { email, password } = req.body as IPostBody;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const auth = await authenticateUser.execute({
    email,
    password,
  });

  return res.json(auth);
});

export default router;
