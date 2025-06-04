import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty({
    message: 'Название отеля является обязательным для заполнения полем',
  })
  @MinLength(5, { message: 'Название отеля должно иметь не менее 5 символов!' })
  @MaxLength(50, {
    message: 'Название отеля должно иметь не более 50 символов!',
  })
  @IsString()
  readonly title: string;

  @IsOptional()
  @MaxLength(5000, {
    message: 'Описание отеля должно иметь не более 5000 символов!',
  })
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly images?: any;
}
