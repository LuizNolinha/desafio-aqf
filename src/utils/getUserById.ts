import { User } from '../entity/user.entity';
import { AppDataSource } from '../infra/datasource';
import { IBasicReturn } from '../request/response/IBasicReturn';

const userRepository = AppDataSource.getRepository(User);

export async function getUserOrNotFound(id: number): Promise<{ user: User } | IBasicReturn> {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    return { status: 404, response: { error: 'Usuário não encontrado' } };
  }
  return { user };
}