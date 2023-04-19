import { OperationResult } from 'urql';
import {
  LoginMutation,
  Exact
} from '@multi-cart/react-data-access';
import { FormikErrors } from 'formik';

export interface ValuesTypes {
  usernameOrEmail: string;
  password: string;
}
export type ResponseType = OperationResult<
  LoginMutation, Exact<{
    usernameOrEmail: string;
    password: string;
  }>
>;
export type FormikErrorFnType = (
  errors: FormikErrors<{
    usernameOrEmail: string;
    password: string;
  }>
) => void;
