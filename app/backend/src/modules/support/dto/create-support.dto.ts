import { ID } from '../../../infrastructure/global';

export interface CreateSupportRequestDto {
  userId: ID;
  text: string;
}
