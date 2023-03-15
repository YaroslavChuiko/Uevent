import { SubscriptionResponse, Event, EventsParam, EventsResponse } from '~/types/event';
import type { ISubscribe, ICreate, IUpdate } from '~/validation/event';
import { apiSlice } from './api-slice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, EventsParam>({
      query: (queryParams) => ({
        url: `/events`,
        params: { ...queryParams },
      }),
      transformResponse(events: Event[], meta: any) {
        return { events, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const events = result?.events || [];
        return ['Event', ...events.map(({ id }) => ({ type: 'Event' as const, id }))];
      },
    }),
    getEvent: builder.query<Event, number>({
      query: (id) => `/events/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Event' as const, id: arg }],
    }),
    createEvent: builder.mutation<Event, ICreate>({
      query: (body) => ({
        url: '/events',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Event'],
    }),
    updateEvent: builder.mutation<Event, IUpdate & Pick<Event, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/events/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Event', id: arg.id }],
    }),
    deleteEvent: builder.mutation<Event, number>({
      query: (id) => ({
        url: `/event/${id}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Event'],
    }),
    checkoutForEvent: builder.mutation<SubscriptionResponse, ISubscribe & { id: number }>({
      query: ({ isVisible, promoCode, id }) => ({
        url: `/events/${id}/subscribe`,
        method: 'POST',
        body: { isVisible, promoCode },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Event' as const, id: arg.id },
        { type: 'EventSubscribers' as const, id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetEventQuery,
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useCheckoutForEventMutation,
} = extendedApiSlice;
