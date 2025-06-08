import { User } from '../entity/user.entity';
import { AppDataSource } from '../infra/datasource';
import { ICreateUser } from '../infra/types/index.type';
import { IUpdateUser } from '../infra/types/IUpdateUser.type';
import { userToResponse } from '../request/dto/userResponse.dto';
import { IBasicReturn } from '../request/response/IBasicReturn';
import { getUserOrNotFound } from '../utils/getUserById';

const userRepository = AppDataSource.getRepository(User);

export const userService =  {
    createUser: async (userToCreate: ICreateUser): Promise<IBasicReturn> => {
        const existEmail = await userRepository.findOneBy({ email: userToCreate.email });
        if(existEmail){
             return {
                status: 400,
                response: {
                    error: 'Email ja cadastrado!'
                }
            };
        }

        const user = userRepository.create(userToCreate);        

        try {
            await userRepository.save(user);
            return {
                status: 200,
                response: {
                    id: user.id
                } 
            };
        } catch (e) {
            return {
                status: 500,
                response: {
                    error: `Erro ao criar usuario ${e}`
                }
            };
        }
    },

    getUserById: async(id: number): Promise<IBasicReturn> => {
        const result = await getUserOrNotFound(id);
        if ('status' in result) return result;

        return {
            status: 200,
            response: userToResponse(result.user)
        };
    },

    updateUser: async(id: number, toUpdate: IUpdateUser): Promise<IBasicReturn> => {

        const result = await getUserOrNotFound(id);
        if ('status' in result) return result;
        const { user } = result;
        
        try{
            if(toUpdate.email){
                const emailIsInUse = await userRepository.findOneBy({ email: toUpdate.email });
                if (emailIsInUse) {
                    return { status: 400, response: { error: 'Email ja cadastrado!' } };
                }

                user.email = toUpdate.email; 
            }

            user.name = toUpdate.name || user.name;
            await userRepository.save(user);

            return {
                status: 200,
                response: userToResponse(user),
            };
        }catch(ex){
            return {
                status: 500,
                response: {
                    error: `Falha ao atualizar o usuario ${ex}`
                }
            };
        }
    },

    deleteUser: async(id: number): Promise<IBasicReturn> => {
        const result = await getUserOrNotFound(id);
        if ('status' in result) return result;
        const { user } = result;

        try{
            await userRepository.delete({id: user.id});
            return { status: 200, response: {} };

        }catch(ex){
             return {
                status: 500,
                response: {
                    error: `Falha ao excluir o usuario ${ex}`
                }
            };
        }
        

    }
};