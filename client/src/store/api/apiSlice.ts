import { createApi } from '@reduxjs/toolkit/query/react';
import { logout } from '../profileSlice';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    deleteProfile: builder.mutation({
      query: () => ({
        url: 'me/profile',
        method: 'DELETE',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {}
      },
    }),
  }),
});

export const { useDeleteProfileMutation } = apiSlice;
