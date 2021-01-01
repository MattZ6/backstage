import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const router = Router();
const sessionController = new SessionController();

router.post(
  '',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  sessionController.create
);

export default router;
