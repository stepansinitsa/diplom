export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string,
  contactPhone?: string;
}

export interface HotelData {
  _id: string;
  title: string;
  description: string;
  images: string[],
}

export interface HotelRoomData {
  _id: string,
  hotel: string;
  title: string;
  description: string;
  images: string[];
  isEnabled: boolean;
}

export interface RegData {
  email: string;
  name: string;
  password: string;
  contactPhone?: string;
}

export interface SearchHotelsDto {
  limit?: number;
  offset?: number;
  title?: string;
}

export interface SearchRoomsDto {
  hotel: string;
  limit?: number;
  offset?: number;
  title?: string;
  isEnabled?: boolean;
}

export interface SearchUsersDto {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

export interface AddReservationDto {
  userId: string | null;
  hotelId: string;
  roomId: string;
  dateStart: string;
  dateEnd: string;
}

export interface SearchReservationsDto {
  userId: string;
}

export interface ReservationData {
  _id: string;
  userId: { _id: string, email: string };
  hotelId: { _id: string, title: string };
  roomId: { _id: string, title: string };
  dateStart: string,
  dateEnd: string,
}

export interface CreateSupportRequestDto {
  userId: string | null;
  text: string;
}

export interface GetChatListParams {
  userId: string | null;
  isActive: boolean;
}

export interface SendMessageDto {
  authorId: string;
  supportRequestId: string;
  text: string;
}

export interface MarkMessagesAsReadDto {
  userId: string;
  supportRequestId: string;
  createdBefore: Date;
}

export interface SupportRequestData {
  _id: string;
  userId: UserData;
  messages: MessageData;
  isActive: boolean;
  createdAt: Date;
}

export interface MessageData {
  _id: string;
  authorId: string;
  text: string;
  sentAt: Date;
  readAt: Date;
}

export interface SocketDto {
  _id: string;
  text: string;
  sentAt: string;
  author: {
    id: string;
    name: string;
  };
}