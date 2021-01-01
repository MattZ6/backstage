import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const router = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

router.post(
  '/forgot',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  forgotPasswordController.create
);

router.post(
  '/reset',
  celebrate({
    body: Joi.object().keys({
      token: Joi.string().uuid().required(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  resetPasswordController.create
);

export default router;
