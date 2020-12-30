import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const router = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

router.post('/forgot', forgotPasswordController.create);
router.post('/reset', resetPasswordController.create);

export default router;
