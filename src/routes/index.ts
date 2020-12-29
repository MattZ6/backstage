import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './session.routes';

const router = Router();

router.use('/v1/sessions', sessionsRouter);

router.use('/v1/users', usersRouter);

export default router;
