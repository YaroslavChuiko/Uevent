import { createApi } from '@reduxjs/toolkit/query/react';
import { logout, setUser, updateUser } from '../profileSlice';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Event', 'Company'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/me/profile',
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: ({ login, email, fullName }) => ({
        url: 'me/profile',
        method: 'PUT',
        body: { login, email, fullName },
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getProfile', undefined, (draft) => {
            Object.assign(draft, body);
          }),
        );
        dispatch(updateUser(body));
        queryFulfilled.catch(patchResult.undo);
      },
    }),
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
      invalidatesTags: ['User'],
    }),
    updateAvatar: builder.mutation({
      query: (form) => ({
        url: 'me/profile/avatar',
        method: 'PUT',
        body: form,
      }),
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUser(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useDeleteProfileMutation, useUpdateAvatarMutation } =
  apiSlice;
