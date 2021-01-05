import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import InstrumentController from '@modules/instruments/infra/http/controllers/InstrumentController';

const router = Router();
const instrumentController = new InstrumentController();

router.use(ensureAuthenticated);

router.get('', instrumentController.index);

router.post(
  '',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().required(),
      label: Joi.string().trim().required(),
    }),
  }),
  instrumentController.create
);

router.put(
  '/:id',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().required(),
      label: Joi.string().trim().required(),
    }),
  }),
  instrumentController.update
);

export default router;
