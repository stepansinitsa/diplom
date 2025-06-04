import { IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  readonly role: string;
}
