import { createUrqlClient } from '@multi-cart/react-data-access';
import { AppLayout, useIsAuth } from '@multi-cart/react-shared-components';
import { FullScreenSpinner } from '@multi-cart/react-ui';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { EditCartContainer } from '../../appViews/EditCartContainer';

const EditCartPage: NextPage = () => {
  useIsAuth();
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return <FullScreenSpinner />;
  }

  return (
    <AppLayout>
      <EditCartContainer id={id} />
    </AppLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditCartPage);
