import { logout, setCredentials } from '../profileSlice';
import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ login, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { login, password },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = extendedApiSlice;
