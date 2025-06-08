import { Router } from 'express';
import { authController } from '../controller/auth.controller';

const authRouter = Router();

authRouter.post('/login',  async (req, res) => {
    authController.login(req, res);
});


export default authRouter;