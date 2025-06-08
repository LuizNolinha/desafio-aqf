import { plainToInstance } from 'class-transformer';
import { IsEmail, IsNotEmpty, validate } from 'class-validator';
import { Response } from 'express';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;
}


export async function validateCreateUserRequest(body: any, res: Response ) {
    const dto = plainToInstance(CreateUserDto, body);
    const errors = await validate(dto);

    if (errors.length > 0) {
        const messages = errors.map(err => Object.values(err.constraints || {})).flat();
        return res.status(400).json({ errors: messages });
    }

    return dto;
  }
