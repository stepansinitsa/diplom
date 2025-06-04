import { ID } from '../../../infrastructure/global';

export interface MarkMessagesAsReadDto {
  userId: ID;
  supportRequestId: ID;
  createdBefore: Date;
}
