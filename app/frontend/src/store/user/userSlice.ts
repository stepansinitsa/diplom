import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeToken, setToken } from '../../helpers/localStorage.helpers';

interface UserState {
  token: string | null;
  role: string;
  isAuth: boolean;
  id: string | null;
}

const initialState: UserState = {
  token: null,
  role: 'client',
  isAuth: false,
  id: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; role: string, id: string }>) => {
      state.token = action.payload.token;
      setToken(action.payload.token);
      state.isAuth = true;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
    logout: (state) => {
      Object.assign(state, initialState);
      removeToken();
    },
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer