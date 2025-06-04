import fetchData from './fetchData';
import {
  RegData,
  SearchHotelsDto,
  SearchRoomsDto,
  SearchUsersDto,
  AddReservationDto,
  SearchReservationsDto,
  CreateSupportRequestDto,
  GetChatListParams,
  SendMessageDto,
  MarkMessagesAsReadDto,
} from '../types/interfaces';

export default function useFetchData() {
  const usersApi = {
    search(searchParams: Partial<SearchUsersDto>) {
      const result = fetchData('users', { method: 'GET', params: searchParams });
      return result;
    },
    updateRole(id: string, role: string) {
      const result = fetchData(`users/${id}`, { method: 'PUT', data: { role } });
      return result;
    },
  };

  const authUser = {
    login(email: string, password: string) {
      const result = fetchData('auth/signin', { method: 'POST', data: { email, password } });
      return result;
    },
    register(data: RegData) {
      const result = fetchData('auth/signup', { method: 'POST', data });
      return result;
    },
    getInfo(email: string) {
      const result = fetchData('auth/checkauth', { method: 'GET', params: { email } });
      return result;
    },
  }

  const hotelsAPI = {
    search(searchParams: SearchHotelsDto) {
      const result = fetchData('hotels', { method: 'GET', params: searchParams });
      return result;
    },
    findById(id: string) {
      const result = fetchData(`hotels/findhotel/${id}`, { method: 'GET' });
      return result;
    },
    addHotel(data: FormData) {    
      const result = fetchData('hotels', { method: 'POST', data }, true);
      return result;
    },
    updateHotel(data: FormData, id: string) {
      const result = fetchData(`hotels/${id}`, { method: 'PUT', data }, true);
      return result;
    },
  };

  const roomsApi = {
    search(searchParams: SearchRoomsDto) {
      const result = fetchData('rooms', { method: 'GET', params: searchParams });
      return result;
    },
    addRoom(data: FormData) {    
      const result = fetchData('rooms', { method: 'POST', data }, true);
      return result;
    },
    updateRoom(data: FormData, id: string) {
      const result = fetchData(`rooms/${id}`, { method: 'PUT', data }, true);
      return result;
    },
  };

  const reservationsApi = {
    search(searchParams: SearchReservationsDto) {
      const result = fetchData('reservations', { method: 'GET', params: searchParams });
      return result;
    },
    addReservation(data: AddReservationDto) {
      const result = fetchData('reservations', { method: 'POST', data });
      return result;
    },
    removeReservation(reservationId: string, userId: string | null) {
      const result = fetchData(`reservations/${reservationId}`, { method: 'DELETE', data: { userId } });
      return result;
    },
  }

  const supportRequestApi = {
    createRequest(data: CreateSupportRequestDto) {
      const result = fetchData('support', { method: 'POST', data });
      return result;
    },
    findRequests(searchParams: GetChatListParams) {
      const result = fetchData('support', { method: 'GET', params: searchParams });
      return result;
    },
    sendMessage(data: SendMessageDto) {
      const result = fetchData('support/sendmessage', { method: 'POST', data });
      return result;
    },
    getMessages(supportRequestId: string, userId: string) {
      const result = fetchData(`support/getmessages/${supportRequestId}`, { method: 'GET', params: { userId } });
      return result;
    },
    readMessages(data: MarkMessagesAsReadDto) {
      const result = fetchData('support/readmessages', { method: 'POST', data });
      return result;
    },
    closeRequest(supportRequestId: string) {
      const result = fetchData(`support/closerequest/${supportRequestId}`, { method: 'POST' });
      return result;
    },
  }

  return {
    usersApi, authUser, hotelsAPI, roomsApi, reservationsApi, supportRequestApi
  };
}
