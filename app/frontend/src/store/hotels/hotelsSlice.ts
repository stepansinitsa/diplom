import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HotelData } from '../../types/interfaces';

interface HotelsState {
  offset: number,
  limit: number,
  titleSearch: string,
  loading: boolean,
  list: HotelData[],
  currentHotel: HotelData,
}

const initialState: HotelsState = {
  offset: 0,
  limit: 3,
  titleSearch: '',
  loading: false,
  list: [],
  currentHotel: {
    _id: '',
    title: '',
    description: '',
    images: [],
  },
}

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotelsState: (state, action: PayloadAction<Partial<HotelsState>>) => {
      Object.assign(state, action.payload);
    },
  }
})

export const { setHotelsState } = hotelsSlice.actions

export default hotelsSlice.reducer