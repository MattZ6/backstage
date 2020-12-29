import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const router = Router();

interface IPostBody {
  email: string;
  password: string;
}

router.post('', async (req, res) => {
  const { email, password } = req.body as IPostBody;

  const authenticateUser = new AuthenticateUserService();

  const auth = await authenticateUser.execute({
    email,
    password,
  });

  return res.json(auth);
});

export default router;
