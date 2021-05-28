import { Alert, Box, Button, Stack, useColorModeValue as mode, } from '@chakra-ui/react';
import { useChangePasswordMutation } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { Form, Formik } from 'formik';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import './ChangePasswordForm.module.scss';

export const ChangePasswordForm = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (

    <Formik initialValues={{ newPassword: "" }}
      onSubmit={async (values, { setErrors }) => {
        // hit DB
        const response = await changePassword({
          username,
          newPassword: values.newPassword,
          token:
            typeof router.query.token === "string" ? router.query.token : ""
        });

        // handle errors
        if (response.data?.changePassword === null || ("errors" in response)) {
          if ("errors" in response) {
            alert((response as any).errors[0].message);
          } else {
            setTokenError("error");
          }
        } else if (response.data?.changePassword) {
          // consider them logged in? no, force them to login again with that new password
          // TODO: would be nice to display some kind of success toast! All set, now please login with that new password!
          router.push("/login");
        }

      }}>
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing="6">
            <InputField
              required
              label="New Password "
              name="newPassword"
              placeholder="new password"
              type="password">
            </InputField>
            {tokenError ?
              <div>
                <Alert status="error">
                  <span role='img' aria-label='emoji'>❗️</span><strong>Error: &nbsp;</strong>
                  <NextLink href="/forgot-password">
                    <Box href="/forgot-password" as="a" color={mode('pink.600', 'pink.200')} fontWeight="semibold" fontSize="sm">
                      Please try a fresh token
                    </Box>
                  </NextLink>
                </Alert>
              </div>
              : null}

            <Button type="submit" colorScheme="pink" size="lg" fontSize="md">Change Password</Button>
          </Stack>
        </Form>
      )}
    </Formik>

  );
}