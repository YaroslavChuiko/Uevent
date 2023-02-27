import { Format, FormatsParam, FormatsResponse } from '~/types/format';
import { apiSlice } from './api-slice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFormats: builder.query<FormatsResponse, FormatsParam>({
      query: (queryParams) => ({
        url: `/formats`,
        params: { ...queryParams },
      }),
      transformResponse(formats: Format[], meta: any) {
        return { formats, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const formats = result?.formats || [];
        return ['Format', ...formats.map(({ id }) => ({ type: 'Format' as const, id }))];
      },
    }),
  }),
});

export const { useLazyGetFormatsQuery } = extendedApiSlice;
