import * as Yup from 'yup';
import { Register } from '@js-camp/core/models/auth/register';

/** Register value for register form. */
export interface RegisterValues extends Register {

  /** Confirm password. */
  confirmPassword: string;
}

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email required')
    .max(254, 'Too long!'),
  firstName: Yup.string().max(30, 'Too long!'),
  lastName: Yup.string().max(30, 'Too long!'),
  password: Yup.string().required('Password required')
    .max(128, 'Too long!'),
  confirmPassword: Yup.string()
    .required('Confirm password required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const defaultRegisterValues: RegisterValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};
