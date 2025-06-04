import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HotelRoomData } from '../../types/interfaces';

interface RoomsState {
  offset: number,
  limit: number,
  titleSearch: string,
  loading: boolean,
  list: HotelRoomData[],
  currentRoom: HotelRoomData,
}

const initialState: RoomsState = {
  offset: 0,
  limit: 3,
  titleSearch: '',
  loading: false,
  list: [],
  currentRoom: {
    _id: '',
    hotel: '',
    title: '',
    description: '',
    images: [],
    isEnabled: true,
  },
}

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomsState: (state, action: PayloadAction<Partial<RoomsState>>) => {
      Object.assign(state, action.payload);
    },
  }
})

export const { setRoomsState } = roomsSlice.actions

export default roomsSlice.reducer