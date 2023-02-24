import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  user: {
    id: string | null;
    login: string | null;
    email: string | null;
    fullName: string | null;
    picturePath: string | null;
  };
  accessToken: string | null;
};

const initialState: IInitialState = {
  user: {
    id: null,
    login: null,
    email: null,
    fullName: null,
    picturePath: null,
  },
  accessToken: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCredentials(state, { payload }) {
      const { accessToken, isConfirmed, role, ...user } = payload;
      state.accessToken = accessToken;
      state.user = user;
    },
    logout(state) {
      state = initialState;
    },
  },
});

export const { setCredentials, logout } = profileSlice.actions;
export default profileSlice.reducer;
