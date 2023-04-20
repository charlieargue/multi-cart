import { Button, Stack } from '@chakra-ui/react';
import { useRegisterMutation } from '@multi-cart/react-data-access';
import { ErrMsg, InputField } from '@multi-cart/react-ui';
import {
  passwordAttributes,
  toCombinedErrorMap,
  toErrorMap,
} from '@multi-cart/util';
import { ErrorMessage, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useMyToasts } from '../../_hooks/useMyToasts';
import './RegistrationForm.module.scss';

export const RegistrationForm = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const { toastError, toastSuccess } = useMyToasts();

  return (
    <Formik
      initialValues={{ username: '', password: '', email: '' }}
      onSubmit={async (values, { setErrors }) => {
        localStorage.removeItem('token');
        try {
          const response = await register({
            options: values,
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data?.register.errors));
          } else if (response.error?.graphQLErrors) {
            setErrors(toCombinedErrorMap(response.error?.graphQLErrors));
          } else if (
            response.data?.register.user &&
            response.data?.register.token
          ) {
            localStorage.setItem('token', response.data.register.token);
            toastSuccess('👍 All set, welcome aboard!');
            router.push('/dashboard');
          }
        } catch (err) {
          console.error(err);
          toastError(err.message || 'Something went wrong... sorry.');
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Stack spacing="6">
            <InputField
              required
              label="Username"
              name="username"
              placeholder="username"
            ></InputField>
            <ErrorMessage component={ErrMsg} name="username" />
            <InputField
              required
              label="Email"
              name="email"
              placeholder="email"
              type="email"
              muted="We'll never share your email."
            ></InputField>
            <ErrorMessage component={ErrMsg} name="email" />
            <InputField
              required
              {...passwordAttributes}
              label="Password"
              name="password"
              placeholder="password"
              type="password"
            ></InputField>
            <ErrorMessage component={ErrMsg} name="password" />
            <Button
              isLoading={isSubmitting}
              loadingText="Registering..."
              colorScheme="pink"
              size="lg"
              fontSize="md"
              type="submit"
            >
              Register
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
