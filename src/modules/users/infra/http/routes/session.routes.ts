import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const router = Router();
const sessionController = new SessionController();

router.post('', sessionController.create);

export default router;
