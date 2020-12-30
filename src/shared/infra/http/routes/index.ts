import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';

const router = Router();

router.use('/v1/sessions', sessionsRouter);
router.use('/v1/users', usersRouter);
router.use('/v1/password', passwordRouter);

export default router;
