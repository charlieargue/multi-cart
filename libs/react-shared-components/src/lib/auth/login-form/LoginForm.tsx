import { Avatar, Badge, Box, Button, Flex, Stack, Text, Tooltip } from '@chakra-ui/react';
import { useLoginMutation } from '@multi-cart/react-data-access';
import { DividerWithText, InputField, PasswordField } from '@multi-cart/react-ui';
import { toErrorMap } from '@multi-cart/util';
import { Form, Formik } from 'formik';
import { useRouter } from "next/router";
import React, { useState } from 'react';
import useMyToasts from '../../_hooks/useMyToasts';

/* eslint-disable-next-line */
export interface LoginFormProps { }

export function LoginForm(props: LoginFormProps) {
  const { toastError, toastSuccess } = useMyToasts();
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [isGuestSubmitting, setIsGuestSubmitting] = useState(false);

  const handleGuestLogin = async () => {
    // TODO: DRY more!
    setIsGuestSubmitting(true);
    // clear token(s)
    localStorage.removeItem("token"); // VIP, otherwise will not send x-api-key
    const response = await login({
      "usernameOrEmail": "guest",
      "password": "mcGUEST_DEV_1#"
    });
    if (response.data?.login.user && response.data?.login.token) {
      localStorage.setItem("token", response.data.login.token)
      toastSuccess("Welcome, Guest 👋!");
      // got return url?
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/dashboard");
      }
    } else {
      toastError("Incorrect credentials, please try again!");
    }
    setIsGuestSubmitting(false);
  };

  const guestModeLogin = <Tooltip
    hasArrow
    label="You won't have to register, but other guests can edit/break your cart at any time! And we're not responsible for any content you may see."
    bg="gray.300"
    color="black"
    placement="top">
    <Flex
      onClick={handleGuestLogin}
      className="cursor-pointer"
      bgGradient="linear(to-t, brand.yellow, brand.pink)"
      borderRadius="4px"
      shadow="md"
      p={3}>
      <Avatar src="/guest.png" />
      <Box ml="3">
        <Text fontWeight="bold">
          Guest Login
      <Badge ml="1" colorScheme="green">
            New
      </Badge>
        </Text>
        <Text fontSize="sm" color="gray.900">No registration required!</Text>
      </Box>
    </Flex>
  </Tooltip>;

  return (
    <Formik initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        // clear token(s)
        localStorage.removeItem("token"); // VIP, otherwise will not send x-api-key
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
            {guestModeLogin}
            <DividerWithText mt="6">or...</DividerWithText>
            <InputField
              required
              // NO! since can be username too... type="email"
              label="Username or Email"
              name="usernameOrEmail"
              placeholder="username or email">
            </InputField>
            <PasswordField />
            <Button
              isLoading={isSubmitting || isGuestSubmitting}
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