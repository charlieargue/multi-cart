import React from 'react';
import MicroLayout from '../../_layout/micro-layout/MicroLayout';
import { ChangePasswordForm } from './ChangePasswordForm';
import { withNextRouter } from 'storybook-addon-next-router';

export default {
  component: ChangePasswordForm,
  title: 'ChangePasswordForm',
  decorators: [withNextRouter],
};

export const primary = () => {

  return <MicroLayout
    heading={<> Enter a New Password</>}
    subHeading={<span><span role='img' aria-label='emoji'>🔐 </span>And then <strong>login</strong> into your account again, please!</span>}>
    <ChangePasswordForm />
  </MicroLayout>
    ;
};

primary.parameters = {
  nextRouter: {
    path: '/profile/[id]',
    asPath: '/profile/lifeiscontent',
    query: {
      username: 'abracadabra',
    },
  },
};