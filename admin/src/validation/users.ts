import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FULL_NAME_LENGTH, LOGIN_LENGTH, PASSWORD_LENGTH, ROLE_ENUM } from '../consts/validation';

const createSchema = yupResolver(
  Yup.object().shape({
    login: Yup.string().required().min(LOGIN_LENGTH.min).max(LOGIN_LENGTH.max),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
    fullName: Yup.string().required().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
    role: Yup.mixed().oneOf(ROLE_ENUM).required(),
  }),
);

const updateSchema = yupResolver(
  Yup.object().shape({
    login: Yup.string().min(LOGIN_LENGTH.min).max(LOGIN_LENGTH.max),
    email: Yup.string().email(),
    fullName: Yup.string().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
    role: Yup.mixed().oneOf(ROLE_ENUM),
  }),
);

export { createSchema, updateSchema };
