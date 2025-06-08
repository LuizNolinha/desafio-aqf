import { Request, Response } from 'express';
import { validateCreateUserRequest } from '../request/dto/createUser.dto';
import { userService } from '../service/user.service';
import { User } from '../entity/user.entity';


export const userController = {
    createUser: async (req: Request, res: Response) => {
        try{
            await validateCreateUserRequest(req.body, res);
            const result = await userService.createUser(req.body);
            return res.status(result.status).json(result.response);
        }catch(ex){
            return res.status(500).json({message: `Erro ao criar usuario: ${ex}`});
        }
    },

    getUser: async (req: Request, res: Response) => {
        try{
            const user = (req as any).user as User;
            const result = await userService.getUserById(user.id as number);
            return res.status(result.status).json(result.response);
        }catch(ex){
            return res.status(500).json({message: `Erro ao pegar usuario: ${ex}`});
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try{
            const user = (req as any).user as User;
            const result = await userService.deleteUser(user.id as number);
            return res.status(result.status).json(result.response);
        }catch(ex){
            return res.status(500).json({message: `Erro ao deletar usuario: ${ex}`});
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try{
            const user = (req as any).user as User;
            const result = await userService.updateUser(user.id as number, req.body);
            return res.status(result.status).json(result.response);
        }catch(ex){
            return res.status(500).json({message: `Erro ao atualizar usuario: ${ex}`});
        }
    },
};