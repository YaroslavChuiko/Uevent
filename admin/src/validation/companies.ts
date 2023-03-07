import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { COMPANY_NAME_LENGTH, LATITUDE, LONGITUDE } from '../consts/validation';

const createSchema = yupResolver(Yup.object().shape({
  name: Yup.string().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max).required(),
  email: Yup.string().email().required(),
  latitude: Yup.number().min(LATITUDE.min).max(LATITUDE.max).required(),
  longitude: Yup.number().min(LONGITUDE.min).max(LONGITUDE.max).required(),
}));

const updateSchema = yupResolver(Yup.object().shape({
  name: Yup.string().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max),
  email: Yup.string().email(),
  latitude: Yup.number().min(LATITUDE.min).max(LATITUDE.max),
  longitude: Yup.number().min(LONGITUDE.min).max(LONGITUDE.max),
}));

export { createSchema, updateSchema };

