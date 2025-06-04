import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email является обязательным для заполнения полем' })
  @IsEmail(undefined, {
    message: 'Email введён некорректно',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль является обязательным для заполнения полем' })
  @IsString()
  readonly passwordHash: string;

  @IsNotEmpty({ message: 'Имя является обязательным для заполнения полем' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly contactPhone?: string;

  @IsOptional()
  @IsString()
  readonly role?: string;
}
