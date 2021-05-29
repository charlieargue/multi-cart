import { Button, Stack } from '@chakra-ui/react';
import { useRegisterMutation } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import { useRouter } from "next/router";
import React from 'react';
import './RegistrationForm.module.scss';
import 'regenerator-runtime/runtime';

/* eslint-disable-next-line */
export interface RegistrationFormProps { }

export function RegistrationForm(props: RegistrationFormProps) {
  const router = useRouter();
  const [, register] = useRegisterMutation()

  return (
    <Formik initialValues={{ username: "", password: "", email: "" }}
      onSubmit={async (values, { setErrors }) => {
        // clear token(s)
        localStorage.removeItem("token");
        const response = await register({
          options: values
        });
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data?.register.errors))
        } else if (response.data?.register.user && response.data?.register.token) {
          // save token(s) to localstorage
          localStorage.setItem("token", response.data.register.token)
          router.push("/dashboard");
        }
      }}>

      {({ isSubmitting }) => (
        <Form>
          <Stack spacing="6">
            <InputField
              label="Username"
              name="username"
              placeholder="username">
            </InputField>

            <InputField
              label="Email"
              name="email"
              placeholder="email"
              type="email"
              muted="We'll never share your email.">
            </InputField>
            <InputField
              label="Password"
              name="password"
              placeholder="password"
              type="password">
            </InputField>
            <Button colorScheme="pink" size="lg" fontSize="md" type="submit">Register</Button>
          </Stack>
        </Form>
      )
      }
    </Formik >
  );
}
