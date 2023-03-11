import { User, UsersParam, UsersResponse } from '~/types/user';
import { apiSlice } from './api-slice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'User' as const, id: arg }],
    }),
    getUsers: builder.query<UsersResponse, UsersParam>({
      query: (params) => ({
        url: '/users',
        params,
      }),
      transformResponse(users: User[], meta: any) {
        return { users, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (_result, _err, arg) => {
        const { eventId, companyId } = arg;
        const type =
          (eventId && ('EventSubscribers' as const)) ||
          (companyId && ('CompanySubscribers' as const)) ||
          ('User' as const);
        const tag = {
          id: eventId || companyId,
          type,
        };
        return [type, tag];
      },
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = extendedApiSlice;
