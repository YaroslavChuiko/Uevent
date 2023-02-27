import { Event, EventsParam, EventsResponse } from '~/types/event';
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
    // createEvent: builder.mutation({
    //   query: ({ author_id, title, content, post_categories, status }) => ({
    //     url: `/events`,
    //     method: 'POST',
    //     body: { author_id, title, content, post_categories, status },
    //   }),
    //   invalidatesTags: ['Event'],
    // }),
    // updateEvent: builder.mutation({
    //   query: ({ id, author_id, title, content, post_categories, status }) => ({
    //     url: `/events/${id}`,
    //     method: 'PUT',
    //     body: { author_id, title, content, post_categories, status },
    //   }),
    //   invalidatesTags: (_result, _error, arg) => [{ type: 'Event', id: arg.id }],
    // }),
    deleteEvent: builder.mutation<Event, number>({
      query: (id) => ({
        url: `/event/${id}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const { useGetEventQuery, useGetEventsQuery, useDeleteEventMutation } = extendedApiSlice;
