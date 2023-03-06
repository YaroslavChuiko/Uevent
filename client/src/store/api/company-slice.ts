import { CompaniesParam, CompaniesResponse, Company, SubscriptionResponse } from '~/types/company';
import { apiSlice } from './api-slice';
import type { ICreate, IUpdate } from '~/validation/companies';
import { User, UsersParam, UsersResponse } from '~/types/user';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<CompaniesResponse, CompaniesParam>({
      query: (queryParams) => ({
        url: `/companies`,
        params: { ...queryParams },
      }),
      transformResponse(companies: Company[], meta: any) {
        return { companies, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const companies = result?.companies || [];
        return ['Company', ...companies.map(({ id }) => ({ type: 'Company' as const, id }))];
      },
    }),
    getCompany: builder.query<Company, number>({
      query: (id) => `/companies/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Company' as const, id: arg }],
    }),
    createCompany: builder.mutation<Company, ICreate>({
      query: (body) => ({
        url: '/companies',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Company'],
    }),
    updateCompany: builder.mutation<Company, IUpdate & Pick<Company, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Company', id: arg.id }],
    }),
    deleteCompany: builder.mutation<void, number>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
    updateCompanyAvatar: builder.mutation<Company, { form: FormData } & Pick<Company, 'id'>>({
      query: ({ id, form }) => ({
        url: `/companies/${id}/avatar`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Company', id: arg.id }],
    }),
    deleteCompanyAvatar: builder.mutation<void, number>({
      query: (id) => ({
        url: `/companies/${id}/avatar`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Company', id: arg }],
    }),
    getCompanySubscribers: builder.query<UsersResponse, UsersParam>({
      query: (params) => ({
        url: '/users',
        params,
      }),
      transformResponse(users: User[], meta: any) {
        return { users, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (_result, _err, arg) => [{ type: 'CompanySubscribers' as const, id: arg.companyId }],
    }),
    subscribe: builder.mutation<SubscriptionResponse, number>({
      query: (id) => ({
        url: `/me/companies/${id}`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'CompanySubscribers', id: arg }],
    }),
    unsubscribe: builder.mutation<void, number>({
      query: (id) => ({
        url: `/me/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'CompanySubscribers', id: arg }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useLazyGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyAvatarMutation,
  useDeleteCompanyAvatarMutation,
  useGetCompanySubscribersQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} = extendedApiSlice;
