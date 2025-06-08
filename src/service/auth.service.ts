import { User } from '../entity/user.entity';
import { AppDataSource } from '../infra/datasource';
import { ILoginCredentials } from '../infra/types/ILoginCredentials.type';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 

const jwt_sercret = process.env.JWT_SECRET || ''; 
const userRepository = AppDataSource.getRepository(User);

export const authService = {
    login: async (credentials: ILoginCredentials) => {
        const user = await userRepository.findOneBy({ email: credentials.email });

        if (!user || !(await user.validatePassword(credentials.password))) {
            return {
                status: 401,
                response: {
                     message: 'Credenciais inválidas'
                }
            };
        }

        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, jwt_sercret, {
            expiresIn: '1h',
        });

        return {
            status: 200,
            response: {
                token: token
            }
        };
    }
};