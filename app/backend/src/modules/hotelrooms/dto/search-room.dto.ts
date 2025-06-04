import { ID } from '../../../infrastructure/global';

export interface SearchRoomParamsDto {
  hotel: ID;
  title?: any;
  limit?: number;
  offset?: number;
  isEnabled?: string;
}
