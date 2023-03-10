import z from 'zod';
import { COMMENT_CONTENT_LENGTH } from '~/consts/validation';

const createSchema = z.object({
  content: z.string().min(COMMENT_CONTENT_LENGTH.min).max(COMMENT_CONTENT_LENGTH.max),
});

export { createSchema };
export type ICreate = z.infer<typeof createSchema>;
