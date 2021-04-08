import { useLoginMutation } from '@multi-cart/react-data-access';
import { InputField, Wrapper } from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

/* eslint-disable-next-line */
export interface LoginProps { }

export function Login(props: LoginProps) {

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
              router.push("/");
            }
          }

        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="Username or Email"
              name="usernameOrEmail"
              placeholder="username or email">
            </InputField>
            <InputField
              label="Password"
              name="password"
              placeholder="password"
              type="password"
              muted={
                <Container fluid>
                  <Row>
                    <Col><NextLink href="/forgot-password">forgot password?</NextLink></Col>
                    <Col className="text-right">Or <NextLink href="/register">register an account</NextLink></Col>
                  </Row>
                </Container>
              }>
            </InputField>
            <Button className="mt-4" type="submit">Login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default Login;
