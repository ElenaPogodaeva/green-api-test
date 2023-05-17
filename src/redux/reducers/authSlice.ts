import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  idInstance: string;
  apiTokenInstance: string;
  isAuth: boolean;
  [key: string]: string | boolean;
};

const initialState: AuthState = {
  idInstance: '',
  apiTokenInstance: '',
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
      }>
    ) => {
      state[action.payload.name] = action.payload.value;
    },
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.idInstance = '';
      state.apiTokenInstance = '';
      state.isAuth = false;
    },
  },
});

export const { setLoginData, login, logout } = authSlice.actions;

export default authSlice.reducer;
