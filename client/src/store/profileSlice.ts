import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  user: {
    id: string | undefined;
    login: string | undefined;
    email: string | undefined;
    fullName: string | undefined;
    picturePath: string | undefined;
  };
  accessToken: string | null;
};

const initialState: IInitialState = {
  user: {
    id: undefined,
    login: undefined,
    email: undefined,
    fullName: undefined,
    picturePath: undefined,
  },
  accessToken: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      const { accessToken, ...user } = payload;
      state.user = user;
    },
    updateUser(state, { payload }) {
      Object.assign(state.user, payload);
    },
    setToken(state, { payload }) {
      const { accessToken } = payload;
      state.accessToken = accessToken;
    },
    logout(state) {
      state.user = initialState.user;
      state.accessToken = null;
    },
  },
});

export const { setUser, setToken, updateUser, logout } = profileSlice.actions;
export default profileSlice.reducer;
