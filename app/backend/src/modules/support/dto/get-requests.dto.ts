import { ID } from '../../../infrastructure/global';

export interface GetChatListParams {
  userId: ID | null;
  isActive: boolean;
}
