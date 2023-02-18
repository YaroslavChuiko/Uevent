import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FORMAT_THEME_LENGTH } from '../consts/validation';

const createUpdateSchema = yupResolver(Yup.object().shape({
  name: Yup.string().min(FORMAT_THEME_LENGTH.min).max(FORMAT_THEME_LENGTH.max).required(),
}));

export { createUpdateSchema };

