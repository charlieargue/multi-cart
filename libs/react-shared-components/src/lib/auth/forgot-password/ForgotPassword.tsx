import { useForgotPasswordMutation } from '@multi-cart/react-data-access';
import { InputField, Wrapper } from '@multi-cart/react-ui';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import './ForgotPassword.module.scss';

/* eslint-disable-next-line */
export interface ForgotPasswordProps { }

export function ForgotPassword(props: ForgotPasswordProps) {
    const [, forgotPassword] = useForgotPasswordMutation();
    const [complete, setComplete] = useState(false);

    return (
        <Wrapper variant="small">
            <Formik initialValues={{ email: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await forgotPassword(values);
                    setComplete(true);
                }}>
                {({ isSubmitting }) =>
                    complete ? (
                        <Alert variant="info">
                            🛡 If an account with that email exists, we sent you an email!
                        </Alert>
                    ) : (
                        <Form>
                            <InputField
                                label="Email"
                                name="email"
                                placeholder="email"
                                type="email">
                            </InputField>
                            <Button className="mt-4" type="submit">Forgot Password</Button>
                        </Form>
                    )}
            </Formik>
        </Wrapper>
    );
}