import { ID } from '../../../infrastructure/global';

export interface SendMessageDto {
  authorId: ID;
  supportRequestId: ID;
  text: string;
}
