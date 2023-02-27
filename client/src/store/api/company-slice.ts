import { CompaniesParam, CompaniesResponse, Company } from '~/types/company';
import { apiSlice } from './api-slice';

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
  }),
});

export const { useGetCompaniesQuery, useGetCompanyQuery } = extendedApiSlice;
