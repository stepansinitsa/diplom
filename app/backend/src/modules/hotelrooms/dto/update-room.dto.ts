import { IsOptional, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly images?: any;
}
