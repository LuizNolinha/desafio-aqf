import { User } from '../../entity/user.entity';

interface IuserToResponse {
  id: number | undefined,
  email: string,
  name: string
}

export function userToResponse(user: User): IuserToResponse {
    return {
        id: user.id,
        email: user.email,
        name: user.name
    };
}