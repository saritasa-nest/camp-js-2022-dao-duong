import * as Yup from 'yup';
import { Register } from '@js-camp/core/models/auth/register';

import { ERROR_MESSAGES } from '../../utils/error';

/** Register value for register form. */
export interface RegisterValues extends Register {

  /** Confirm password. */
  confirmPassword: string;
}

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email(ERROR_MESSAGES.invalidEmail)
    .required(ERROR_MESSAGES.requiredEmail)
    .max(254, ERROR_MESSAGES.maxCharacters),
  firstName: Yup.string().max(30, ERROR_MESSAGES.maxCharacters),
  lastName: Yup.string().max(30, ERROR_MESSAGES.maxCharacters),
  password: Yup.string().required(ERROR_MESSAGES.requiredPassword)
    .max(128, ERROR_MESSAGES.maxCharacters),
  confirmPassword: Yup.string()
    .required(ERROR_MESSAGES.requiredConfirmPassword)
    .oneOf([Yup.ref('password'), null], ERROR_MESSAGES.unmatchPassword),
});

export const defaultRegisterValues: RegisterValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};
