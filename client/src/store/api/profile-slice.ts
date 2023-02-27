import { logout, setUser, updateUser } from '../profileSlice';
import { apiSlice } from './api-slice';

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/me/profile',
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      providesTags: ['UserProfile'],
    }),
    updateProfile: builder.mutation({
      query: ({ login, email, fullName }) => ({
        url: 'me/profile',
        method: 'PUT',
        body: { login, email, fullName },
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileSlice.util.updateQueryData('getProfile', undefined, (draft) => {
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
      invalidatesTags: ['UserProfile'],
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
    // deleteAvatar: builder.mutation({
    //   query: () => ({
    //     url: 'me/profile/avatar',
    //     method: 'DELETE',
    //   }),
    //   async onQueryStarted(_body, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       dispatch(updateUser({ picturePath: undefined }));
    //     } catch (error) {}
    //   },
    // }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useDeleteProfileMutation, useUpdateAvatarMutation } =
  profileSlice;
