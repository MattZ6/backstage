import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import UpdatePasswordController from '@modules/users/infra/http/controllers/UpdatePasswordController';

const router = Router();
const profileController = new ProfileController();
const updatePasswordController = new UpdatePasswordController();

router.use(ensureAuthenticated);

router.get('', profileController.show);
router.patch('', profileController.update);
router.put('/password', updatePasswordController.update);

export default router;
