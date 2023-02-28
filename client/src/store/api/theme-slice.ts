import { Theme, ThemesParam, ThemesResponse } from '~/types/themes';
import { apiSlice } from './api-slice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThemes: builder.query<ThemesResponse, ThemesParam>({
      query: (queryParams) => ({
        url: `/themes`,
        params: { ...queryParams },
      }),
      transformResponse(themes: Theme[], meta: any) {
        return { themes, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const themes = result?.themes || [];
        return ['Theme', ...themes.map(({ id }) => ({ type: 'Theme' as const, id }))];
      },
    }),
  }),
});

export const { useLazyGetThemesQuery } = extendedApiSlice;
