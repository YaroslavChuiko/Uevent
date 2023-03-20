import { PromoCode, PromoCodesResponse, PromoCodesParam, CreatePromoCodesPayload } from '~/types/promo-code';
import { apiSlice } from './api-slice';
import { IUpdate } from '~/validation/promo-code';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromoCodes: builder.query<PromoCodesResponse, PromoCodesParam>({
      query: (queryParams) => ({
        url: `/promo-codes`,
        params: { ...queryParams },
      }),
      transformResponse(promoCodes: PromoCode[], meta: any) {
        return { promoCodes, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const promoCodes = result?.promoCodes || [];
        return ['PromoCode', ...promoCodes.map(({ id }) => ({ type: 'PromoCode' as const, id }))];
      },
    }),
    createPromoCode: builder.mutation<PromoCode, CreatePromoCodesPayload>({
      query: (body) => ({
        url: '/promo-codes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PromoCode'],
    }),
    updatePromoCode: builder.mutation<PromoCode, IUpdate & Pick<PromoCode, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/promo-codes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'PromoCode', id: arg.id }],
    }),
    deletePromoCode: builder.mutation<void, number>({
      query: (id) => ({
        url: `/promo-codes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PromoCode'],
    }),
  }),
});

export const {
  useGetPromoCodesQuery,
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
  useDeletePromoCodeMutation,
} = extendedApiSlice;
