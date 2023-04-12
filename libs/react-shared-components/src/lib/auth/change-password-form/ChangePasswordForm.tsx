// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Alert, Box, Button, Stack, useColorModeValue as mode } from '@chakra-ui/react';
import { ChangePasswordMutation, Exact, useChangePasswordMutation } from '@multi-cart/react-data-access';
import { InputField } from '@multi-cart/react-ui';
import { passwordAttributes } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { OperationResult } from 'urql';
import { useMyToasts } from '../../_hooks/useMyToasts';
import './ChangePasswordForm.module.scss';

export const ChangePasswordForm = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const { toastError, toastSuccess } = useMyToasts();
  const username = router.query.username as string;

  return (
    <>
      {tokenError &&
        <Box mb={2}>
          <Alert borderRadius="4px" status="error">
            <span role='img' aria-label='emoji'>❗️</span><strong>Error: &nbsp;</strong>
            <NextLink href="/forgot-password" legacyBehavior>
              <Box href="/forgot-password" as="a" color={mode('pink.600', 'pink.200')} fontWeight="semibold" fontSize="sm">
                Please try a fresh token
                    </Box>
            </NextLink>
          </Alert>
        </Box>}
      <Formik initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          // clear token(s)
          localStorage.removeItem("token");
          // hit DB
          const response: OperationResult<ChangePasswordMutation, Exact<{
            username: string;
            token: string;
            newPassword: string;
          }>> & { errors?: unknown, data?: unknown } = await changePassword({
            username,
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : ""
          });

          // handle errors
          if (response.error) {
            // NOTE: 🔴 BUG: order of hooks error because of next line, not sure why:
            setTokenError("error");
            toastError(response.error.message);
          }
          else if ("errors" in response) {
            setTokenError("error");
            toastError(response.errors[0].message);
          }
          else if ("data" in response && response.data.changePassword) {
            toastSuccess("👍 All set, now please login with that new password!");
            router.push("/login");
          }

        }}>
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="6">
              <InputField
                required
                disabled
                name="username"
                placeholder="username"
                value={router.query.username || ''}>
              </InputField>

              <InputField
                required
                label="New Password "
                name="newPassword"
                placeholder="new password"
                type="password"
                {...passwordAttributes}
              >
              </InputField>
              <Button
                isLoading={isSubmitting}
                loadingText="Saving new password..."
                type="submit"
                colorScheme="pink"
                size="lg"
                fontSize="md">Change Password</Button>
            </Stack>
          </Form>
        )}
      </Formik >
    </>
  );
}