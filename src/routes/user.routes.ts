import { Router } from 'express';
import { userController } from '../controller/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const userRouter = Router();

userRouter.post('/',  async (req, res) => {
    userController.createUser(req, res);
});

userRouter.get('/', authMiddleware, async (req, res) => {
    userController.getUser(req, res);
});

userRouter.put('/', authMiddleware, async (req, res) => {
    userController.updateUser(req, res);
});

userRouter.delete('/', authMiddleware, async (req, res) => {
    userController.deleteUser(req, res);
});

export default userRouter;