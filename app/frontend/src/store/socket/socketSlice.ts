import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketIOState {
  isConnected: boolean;
}

const initialState: SocketIOState = {
  isConnected: false,
}

const socketSlice = createSlice({
  name: 'socketIO',
  initialState,
  reducers: {
    setConnectedStatus: (state, action: PayloadAction<{ isConnected: boolean }>) => {
      Object.assign(state, action.payload);
    },
  }
})

export const { setConnectedStatus } = socketSlice.actions

export default socketSlice.reducer