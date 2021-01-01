import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import UpdatePasswordController from '@modules/users/infra/http/controllers/UpdatePasswordController';
import { celebrate, Joi } from 'celebrate';

const router = Router();
const profileController = new ProfileController();
const updatePasswordController = new UpdatePasswordController();

router.use(ensureAuthenticated);

router.get('', profileController.show);
router.patch(
  '',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().required(),
      nick_name: Joi.string().trim().required(),
      email: Joi.string().email().required(),
    }),
  }),
  profileController.update
);
router.put(
  '/password',
  celebrate({
    body: Joi.object().keys({
      old_password: Joi.string().required(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  updatePasswordController.update
);

export default router;
