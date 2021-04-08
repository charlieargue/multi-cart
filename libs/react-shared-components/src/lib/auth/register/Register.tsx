import { useRegisterMutation } from '@multi-cart/react-data-access';
import { InputField, Wrapper } from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import { useRouter } from "next/router";
import React from 'react';
import { Button } from 'react-bootstrap';
import './Register.module.scss';


/* eslint-disable-next-line */
export interface RegisterProps { }

export function Register(props: RegisterProps) {
  const router = useRouter();
  const [, register] = useRegisterMutation()

  return (
    <Wrapper variant="small">
      <Formik initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            options: values
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data?.register.errors))
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}>

        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="Username"
              name="username"
              placeholder="username">
            </InputField>

            <InputField
              label="Email"
              name="email"
              placeholder="email"
              type="email">
            </InputField>
            <InputField
              label="Password"
              name="password"
              placeholder="password"
              type="password">
            </InputField>
            <Button className="mt-4" type="submit">Register</Button>
          </Form>
        )
        }
      </Formik >
    </Wrapper >
  );
}
