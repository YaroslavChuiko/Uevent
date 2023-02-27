import { User } from '~/types/user';
import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'User' as const, id: arg }],
    }),
  }),
});

export const { useGetUserQuery } = extendedApiSlice;
