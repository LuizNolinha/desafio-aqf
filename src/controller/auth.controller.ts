import { Request, Response } from 'express';
import { authService } from '../service/auth.service';
import { validateLoginRequest } from '../request/dto/login.dto';

export const authController = {
    login: async (req: Request, res: Response) => {
        await validateLoginRequest(req.body, res);
        const result = await authService.login(req.body);
        return res.status(result.status).json(result.response);
    }
};