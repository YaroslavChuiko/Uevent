import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { User, Prisma } from '@prisma/client';
import { getPageOptions, getSortOptions } from '../utils/query-options';
import wait from '../utils/wait';

const event = prisma.event;
const comment = prisma.comment;

const checkEventId = async (id: number) => {
  const exists = await event.findUnique({ where: { id } });
  if (!exists) {
    throw new ClientError('This event does not exist', 404);
  }
};

type TQueryParams =
  | {
      id?: string | string[];
      userId?: string;
      eventId?: string;
      q?: string;
    }
  | undefined;

function getWhereOptions(queryParams: TQueryParams) {
  const where: Prisma.CommentWhereInput = { AND: [] };
  if (!queryParams) {
    return where;
  }
  const { id, userId, eventId, q } = queryParams;

  if (id) {
    let idNum = Array.isArray(id) ? id.map((item) => Number(item)) : [Number(id)];
    Array.isArray(where.AND) &&
      where.AND.push({
        id: { in: idNum },
      });
  }
  if (userId) {
    Array.isArray(where.AND) &&
      where.AND.push({
        userId: Number(userId),
      });
  }
  if (eventId) {
    Array.isArray(where.AND) &&
      where.AND.push({
        eventId: Number(eventId),
      });
  }
  if (q) {
    Array.isArray(where.AND) &&
      where.AND.push({
        content: {
          contains: q,
        },
      });
  }
  return where;
}

const getComments = async (req: Request, res: Response) => {
  const where = getWhereOptions(req.query);

  const [count, comments] = await prisma.$transaction([
    comment.count({ where }),
    comment.findMany({
      where,
      ...getPageOptions(req.query),
      ...getSortOptions(req.query, 'id'),
    }),
  ]);

  await wait(2000);

  res.header('X-Total-Count', `${count}`).json(comments);
};

const getCommentById = async (req: Request, res: Response) => {
  const commentId = Number(req.params.id);

  const found = await comment.findFirst({
    where: {
      id: commentId,
    },
  });
  if (!found) {
    throw new ClientError('The comment is not found.', 404);
  }

  res.json(found);
};

const createComment = async (req: Request, res: Response) => {
  const { id: userId } = req.user as User;
  const { eventId, content } = req.body;

  await checkEventId(eventId);

  const newComment = await comment.create({
    data: {
      content,
      userId,
      eventId,
    },
  });

  res.status(201).json(newComment);
};

const updateComment = async (req: Request, res: Response) => {
  const content = req.body.content;
  const commentId = Number(req.params.id);

  const updatedComment = await comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });

  res.status(201).json(updatedComment);
};

const deleteComment = async (req: Request, res: Response) => {
  const commentId = Number(req.params.id);

  await comment.delete({
    where: { id: commentId },
  });

  res.status(204).send();
};

export { getComments, getCommentById, createComment, updateComment, deleteComment };
