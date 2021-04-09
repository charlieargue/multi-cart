import { Stack, Button } from '@chakra-ui/react';
import { useForgotPasswordMutation } from '@multi-cart/react-data-access';
import { Banner, InputField, Wrapper } from '@multi-cart/react-ui';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { MicroLayout } from '@multi-cart/react-shared-components';
import './ForgotPasswordForm.module.scss';
import { ActionLink } from '@multi-cart/react-ui';

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
                        <MicroLayout heading="Forgot your password?" >
                            <Wrapper variant="small">
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
                            </Wrapper>
                        </MicroLayout>
                    )}

        </Formik>
    );
}

export default ForgotPasswordForm;