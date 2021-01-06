import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import MusicStyleController from '@modules/music_styles/infra/http/controllers/MusicStyleController';

const router = Router();
const musicStyleController = new MusicStyleController();

router.use(ensureAuthenticated);

router.get('', musicStyleController.index);

router.post(
  '',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().required(),
    }),
  }),
  musicStyleController.create
);

router.put(
  '/:id',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().required(),
    }),
  }),
  musicStyleController.update
);

export default router;
