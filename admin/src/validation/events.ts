import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LATITUDE, LONGITUDE, EVENT_NAME_LENGTH } from '../consts/validation';

const createSchema = yupResolver(
  Yup.object().shape({
    companyId: Yup.number().positive().required(),
    name: Yup.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
    description: Yup.string().required(),
    price: Yup.number().min(0).required(),
    ticketsAvailable: Yup.number().positive().required(),
    isNotificationsOn: Yup.boolean().required(),
    isPublic: Yup.boolean().required(),
    date: Yup.date().min(new Date()).required(),
    publishDate: Yup.date().max(Yup.ref('date')).required(),
    latitude: Yup.number().required().min(LATITUDE.min).max(LATITUDE.max),
    longitude: Yup.number().required().min(LONGITUDE.min).max(LONGITUDE.max),
    formatId: Yup.number().positive().required(),
    themeId: Yup.number().positive().required(),
  }),
);

const updateSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
    description: Yup.string().required(),
    price: Yup.number().min(0).required(),
    ticketsAvailable: Yup.number().min(0).required(),
    isNotificationsOn: Yup.boolean().required(),
    isPublic: Yup.boolean().required(),
    date: Yup.date().required(),
    publishDate: Yup.date().max(Yup.ref('date')).required(),
    latitude: Yup.number().required().min(LATITUDE.min).max(LATITUDE.max),
    longitude: Yup.number().required().min(LONGITUDE.min).max(LONGITUDE.max),
    formatId: Yup.number().positive().required(),
    themeId: Yup.number().positive().required(),
  }),
);

export { createSchema, updateSchema };
