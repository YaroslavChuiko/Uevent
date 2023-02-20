import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { COMMENT_CONTENT_LENGTH } from '../consts/validation';

const createSchema = yupResolver(
  Yup.object().shape({
    eventId: Yup.number().positive().required(),
    content: Yup.string().required().min(COMMENT_CONTENT_LENGTH.min).max(COMMENT_CONTENT_LENGTH.max),
  }),
);

const updateSchema = yupResolver(
  Yup.object().shape({
    content: Yup.string().required().min(COMMENT_CONTENT_LENGTH.min).max(COMMENT_CONTENT_LENGTH.max),
  }),
);

export { createSchema, updateSchema };
