import { Comment, CommentsParam, CommentsResponse, CreateCommentPayload, UpdateCommentPayload } from '~/types/comment';
import { apiSlice } from './api-slice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentsResponse, CommentsParam>({
      query: (queryParams) => ({
        url: `/comments`,
        params: { ...queryParams },
      }),
      transformResponse(comments: Comment[], meta: any) {
        return { comments, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const comments = result?.comments || [];
        return ['Comment', ...comments.map(({ id }) => ({ type: 'Comment' as const, id }))];
      },
    }),
    getComment: builder.query<Comment, number>({
      query: (id) => `/comments/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Comment' as const, id: arg }],
    }),
    createComment: builder.mutation<Comment, CreateCommentPayload>({
      query: (payload) => ({
        url: `/comments`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Comment'],
    }),
    updateComment: builder.mutation<Comment, UpdateCommentPayload & Pick<Comment, 'id'>>({
      query: ({ id, content }) => ({
        url: `/comments/${id}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Comment', id: arg.id }],
    }),
    deleteComment: builder.mutation<Comment, number>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } =
  extendedApiSlice;
