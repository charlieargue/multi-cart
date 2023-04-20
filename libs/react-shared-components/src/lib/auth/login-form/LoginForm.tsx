<<<<<<< HEAD
import {
  Button,
  Stack
} from '@chakra-ui/react';
=======
// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Avatar, Badge, Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
>>>>>>> main
import { useLoginMutation } from '@multi-cart/react-data-access';
import {
  DividerWithText,
  InputField,
  PasswordField
} from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useMyToasts from '../../_hooks/useMyToasts';
import { GuestLoginButton } from './GuestLoginButton';
import {
  FormikErrorFnType,
  ResponseType,
  ValuesTypes,
} from './LoginForm.types';

export const LoginForm = () => {
  const { toastError, toastSuccess } = useMyToasts();
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [isGuestSubmitting, setIsGuestSubmitting] = useState(false);

  const handleLogin = async (
    values: ValuesTypes = null,
    setErrors: FormikErrorFnType = null,
    isGuestLogin = false
  ) => {
    if (isGuestLogin) {
      setIsGuestSubmitting(true);
    }
    localStorage.removeItem('token'); // necessary otherwise will not send x-api-key
    let response: ResponseType;
    if (isGuestLogin) {
      response = await login({
        usernameOrEmail: 'guest',
        password: 'mcGUEST_DEV_1#',
      });
    } else {
      response = await login(values);
    }
    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data?.login.errors));
      toastError(response.data?.login.errors[0].message);
    } else if (response.data?.login.user && response.data?.login.token) {
      localStorage.setItem('token', response.data.login.token);
      isGuestLogin
        ? toastSuccess('Welcome, Guest 👋!')
        : toastSuccess('Welcome back!');
      if (typeof router.query.next === 'string') {
        router.push(router.query.next);
      } else {
        router.push('/dashboard');
      }
    } else {
      toastError('Incorrect credentials, please try again!');
    }
    if (isGuestLogin) {
      setIsGuestSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ usernameOrEmail: '', password: '' }}
      onSubmit={async (values, { setErrors }) => handleLogin(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing="6">
            <GuestLoginButton handleLogin={handleLogin} />
            <DividerWithText mt="6">or...</DividerWithText>
            <InputField
              required
              label="Username or Email"
              name="usernameOrEmail"
              placeholder="username or email"
            ></InputField>
            <PasswordField />
            <Button
              isLoading={isSubmitting || isGuestSubmitting}
              loadingText="Logging in..."
              type="submit"
              colorScheme="pink"
              size="lg"
              fontSize="md"
            >
              Login
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;