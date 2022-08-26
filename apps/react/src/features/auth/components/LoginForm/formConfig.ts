import * as Yup from 'yup';
import { Login } from '@js-camp/core/models/auth/login';

import { ERROR_MESSAGES } from '../../utils/error';
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email(ERROR_MESSAGES.invalidEmail)
    .required(ERROR_MESSAGES.requiredEmail),
  password: Yup.string().required(ERROR_MESSAGES.requiredPassword),
});

export const defaultLoginValues: Login = {
  email: '',
  password: '',
};
