import { plainToInstance } from 'class-transformer';
import { IsEmail, IsNotEmpty, validate } from 'class-validator';
import { Response } from 'express';

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

@IsNotEmpty({ message: 'Senha é obrigatório' })
  password!: string;
}


export async function validateLoginRequest(body: any, res: Response ) {
    const dto = plainToInstance(LoginDto, body);
    const errors = await validate(dto);

    if (errors.length > 0) {
        const messages = errors.map(err => Object.values(err.constraints || {})).flat();
        return res.status(400).json({ errors: messages });
    }

    return dto;
  }
