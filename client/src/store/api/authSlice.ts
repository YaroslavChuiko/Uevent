import { logout, setCredentials } from '../profileSlice';
import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ login, email, password, fullName }) => ({
        url: 'auth/register',
        method: 'POST',
        body: { login, email, password, fullName },
      }),
    }),
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
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {}
      },
    }),
    confirmEmail: builder.mutation({
      query: ({ confirmToken }) => ({
        url: `auth/confirm-email/${confirmToken}`,
        method: 'POST',
      }),
    }),
    sendPasswordConfirmation: builder.mutation({
      query: ({ email }) => ({
        url: 'auth/password-reset',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ confirmToken, password }) => ({
        url: `auth/password-reset/${confirmToken}`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useConfirmEmailMutation,
  useSendPasswordConfirmationMutation,
  useResetPasswordMutation,
} = extendedApiSlice;
