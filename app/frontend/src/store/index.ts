import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from './hotels/hotelsSlice';
import roomsReducer from './rooms/roomsSlice';
import userReducer from './user/userSlice';
import usersReducer from './users/usersSlice';
import socketIOReducer from './socket/socketSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    hotels: hotelReducer,
    rooms: roomsReducer,
    users: usersReducer,
    socketIO: socketIOReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
