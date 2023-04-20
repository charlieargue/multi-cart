<<<<<<< HEAD
import {
  ChangePasswordForm,
  MicroLayout,
} from '@multi-cart/react-shared-components';
=======
import { ChangePasswordForm } from '@multi-cart/react-shared-components';
import React from 'react';
import { MicroLayout } from '@multi-cart/react-shared-components';

>>>>>>> main

export const ChangePasswordContainer = () => {
  return (
    <MicroLayout
      heading={<> Enter a New Password</>}
      subHeading={
        <span>
          <span role="img" aria-label="emoji">
            🔐{' '}
          </span>
          And then <strong>login</strong> into your account again, please!
        </span>
      }
    >
      <ChangePasswordForm />
    </MicroLayout>
  );
};
