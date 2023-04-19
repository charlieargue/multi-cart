import {
  ChangePasswordForm,
  MicroLayout,
} from '@multi-cart/react-shared-components';

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
