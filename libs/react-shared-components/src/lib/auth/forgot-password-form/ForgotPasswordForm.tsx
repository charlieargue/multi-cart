import { Button, Stack } from '@chakra-ui/react';
import { useForgotPasswordMutation } from '@multi-cart/react-data-access';
import { MicroLayout } from '@multi-cart/react-shared-components';
import { ActionLink, Banner, InputField } from '@multi-cart/react-ui';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import './ForgotPasswordForm.module.scss';

/* eslint-disable-next-line */
export interface ForgotPasswordFormProps { }

export function ForgotPasswordForm(props: ForgotPasswordFormProps) {
    const [, forgotPassword] = useForgotPasswordMutation();
    const [complete, setComplete] = useState(false);

    return (
        <Formik initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
                const response = await forgotPassword(values);
                setComplete(true);
            }}>
            {({ isSubmitting }) =>
                complete ? (
                    <Banner
                        actionLink={<ActionLink nextHref="/" w={{ base: 'full', sm: 'auto' }} flexShrink={0}>Go back to login.</ActionLink>}
                        text="🛡 If an account with that email exists, we sent you an email!"></Banner>
                ) : (
                        <MicroLayout heading="Forgot your password?" subHeading="🤗 &nbsp; Happens to everyone, we can help!" >
                            <Form>
                                <Stack spacing="6">
                                    <InputField
                                        required
                                        label="Email"
                                        name="email"
                                        placeholder="email"
                                        type="email">
                                    </InputField>
                                    <Button type="submit" colorScheme="pink" size="lg" fontSize="md">Reset Password</Button>
                                </Stack>
                            </Form>
                        </MicroLayout>
                    )}

        </Formik>
    );
}

export default ForgotPasswordForm;