import { Alert, Button } from '@chakra-ui/react';
import { useChangePasswordMutation } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import './ChangePassword.module.scss';

export const ChangePassword = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (

    <Formik initialValues={{ newPassword: "" }}
      onSubmit={async (values, { setErrors }) => {
        // hit DB
        const response = await changePassword({
          newPassword: values.newPassword,
          token:
            typeof router.query.token === "string" ? router.query.token : ""
        });

        // handle errors
        if (response.data?.changePassword.errors) {
          const errorMap = toErrorMap(response.data?.changePassword.errors);
          if ('token' in errorMap) {
            setTokenError(errorMap.token);
          }
          setErrors(errorMap);
        } else if (response.data?.changePassword.user) {
          router.push("/dashboard");
        }

      }}>
      {({ isSubmitting }) => (
        <Form>
          <InputField
            label="New Password "
            name="newPassword"
            placeholder="new password"
            type="password">
          </InputField>
          { tokenError ?
            <div>
              <Alert status="error">{tokenError}</Alert>
              <NextLink href="/forgot-password"><a href="/forgot-password">get a fresh token</a></NextLink>
            </div>
            : null}

          <Button type="submit">Change Password</Button>
        </Form>
      )}
    </Formik>

  );
}