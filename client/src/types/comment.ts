import { Order } from './order';

export type Comment = {
  id: number;
  content: string;
  publishDate: string;
  userId: number;
  eventId: number;
};

export type CreateCommentPayload = Omit<Comment, 'id' | 'publishDate' | 'userId'>;

export type UpdateCommentPayload = Omit<Comment, 'id' | 'publishDate' | 'eventId' | 'userId'>;

export type CommentsResponse = {
  comments: Comment[];
  totalCount: number;
};

export type CommentsParam = {
  _start: number;
  _end: number;
  _sort?: string;
  _order?: Order;
  id?: number;
  userId?: number;
  eventId?: number;
  q?: string;
};
