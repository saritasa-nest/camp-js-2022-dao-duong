import * as Yup from 'yup';
import { Login } from '@js-camp/core/models/auth/login';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Email required'),
  password: Yup.string().required('Password required'),
});

export const defaultLoginValues: Login = {
  email: '',
  password: '',
};
