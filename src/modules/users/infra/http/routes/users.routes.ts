import { Router } from 'express';

import UserController from '@modules/users/infra/http/controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('', userController.create);

export default router;
