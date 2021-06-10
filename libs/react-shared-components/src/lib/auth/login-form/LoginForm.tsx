import { Button, Stack, useToast } from '@chakra-ui/react';
import { useLoginMutation } from '@multi-cart/react-data-access';
import { InputField, PasswordField } from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import { useRouter } from "next/router";
import React from 'react';
import 'regenerator-runtime/runtime';

/* eslint-disable-next-line */
export interface LoginFormProps { }

export function LoginForm(props: LoginFormProps) {
  const toast = useToast();
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Formik initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        // clear token(s)
        localStorage.removeItem("token");
        const response = await login(values);
        if (response.data?.login.errors) {
          toast({
            title: response.data?.login.errors[0].message,
            status: "error",
            isClosable: true,
          });
          setErrors(toErrorMap(response.data?.login.errors))
        } else if (response.data?.login.user && response.data?.login.token) {
          // save token(s) to localstorage
          localStorage.setItem("token", response.data.login.token)
          toast({
            title: "Welcome back!",
            variant: "top-accent",
            position: "top",
            status: "success",
            isClosable: true,
          });
          // got return url?
          if (typeof router.query.next === "string") {
            router.push(router.query.next);
          } else {
            router.push("/dashboard");
          }
        } else {
          // TODO: not sure if good idea, but on wrong login I just return null errors/token/user
          toast({
            title: "Incorrect credentials, please try again!",
            variant: "top-accent",
            position: "top-right",
            status: "error",
            isClosable: true,
          });
        }

      }}>
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing="6">
            <InputField
              required
              label="Username or Email"
              name="usernameOrEmail"
              placeholder="username or email">
            </InputField>
            <PasswordField />
            <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
              Login
              </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;