import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useLoginMutation } from '@multi-cart/react-data-access';
import { InputField, PasswordField, Wrapper } from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import { useRouter } from "next/router";
import React from 'react';


/* eslint-disable-next-line */
export interface LoginFormProps { }

export function LoginForm(props: LoginFormProps) {

  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors))
          } else if (response.data?.login.user) {
            // got return url?
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/dashboard");
            }
          }

        }}>
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="6">
              <InputField
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
    </Wrapper >
  );
}

export default LoginForm;