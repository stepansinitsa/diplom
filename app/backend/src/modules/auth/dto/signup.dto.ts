import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Email является обязательным для заполнения полем' })
  @IsEmail(undefined, {
    message: 'Email введён некорректно',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль является обязательным для заполнения полем' })
  @IsString()
  @MinLength(6, { message: 'Пароль должен состоять из 6 и более символов!' })
  readonly password: string;

  @IsNotEmpty({ message: 'Имя является обязательным для заполнения полем' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly contactPhone?: string;
}
