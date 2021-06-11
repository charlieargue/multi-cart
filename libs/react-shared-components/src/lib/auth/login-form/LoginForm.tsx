import { Button, Stack, useToast } from '@chakra-ui/react';
import { useLoginMutation } from '@multi-cart/react-data-access';
import { InputField, PasswordField } from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import { useRouter } from "next/router";
import React from 'react';
// import 'regenerator-runtime/runtime';
import useMyToasts from '../../_hooks/useMyToasts';

/* eslint-disable-next-line */
export interface LoginFormProps { }

export function LoginForm(props: LoginFormProps) {
  const { toastError, toastSuccess } = useMyToasts();
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Formik initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        // clear token(s)
        localStorage.removeItem("token");
        const response = await login(values);
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data?.login.errors))
          toastError(response.data?.login.errors[0].message);
        } else if (response.data?.login.user && response.data?.login.token) {
          // save token(s) to localstorage
          localStorage.setItem("token", response.data.login.token)
          toastSuccess("Welcome back!");
          // got return url?
          if (typeof router.query.next === "string") {
            router.push(router.query.next);
          } else {
            router.push("/dashboard");
          }
        } else {
          toastError("Incorrect credentials, please try again!");
        }

      }}>
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing="6">
            <InputField
              required
              // NO! since can be username too... type="email"
              label="Username or Email"
              name="usernameOrEmail"
              placeholder="username or email">
            </InputField>
            <PasswordField />
            <Button
              isLoading={isSubmitting}
              loadingText="Logging in..."
              type="submit"
              colorScheme="pink"
              size="lg"
              fontSize="md">
              Login
              </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;