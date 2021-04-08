import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useChangePasswordMutation } from '@multi-cart/react-data-access';
import { createUrqlClient } from '../../urql-customizations/createUrqlClient';
import { toErrorMap } from '@multi-cart/util';
import NextLink from "next/link";
import { Alert, Button } from 'react-bootstrap';
import { Box, Link } from 'react-bootstrap-icons';
import { Wrapper, InputField } from '@multi-cart/react-ui';

export const ChangePassword: NextPage = () => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState("");

    return (

        <Wrapper variant="small">
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
                        router.push("/");
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
                                <Alert variant="danger">{tokenError}</Alert>
                                <NextLink href="/forgot-password"><Link>get a fresh token</Link></NextLink>
                            </div>
                            : null}

                        <Button type="submit">Change Password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>

    );
}

export default withUrqlClient(createUrqlClient)(ChangePassword);