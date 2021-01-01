import { Router } from 'express';

import UserController from '@modules/users/infra/http/controllers/UserController';
import { celebrate, Joi } from 'celebrate';

const router = Router();
const userController = new UserController();

router.post(
  '',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().required(),
      nick_name: Joi.string().trim().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  userController.create
);

export default router;
