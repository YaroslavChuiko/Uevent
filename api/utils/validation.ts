import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import ClientError from '../types/error';

type Resource = 'body' | 'query';

const validate =
  (joiSchema: Joi.AnySchema, resource: Resource = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    const data = req[resource as keyof Request];
    if (!data) {
      next(new ClientError(`Please provide a request ${resource}.`, 400));
    }
    const { error } = joiSchema.validate(data);
    if (error) {
      next(new ClientError(error.message, 400));
    }
    next();
  };

export default validate;
