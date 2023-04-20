import { createUrqlClient } from '@multi-cart/react-data-access';
<<<<<<< HEAD
import { AppLayout, useIsAuth } from '@multi-cart/react-shared-components';
import { FullScreenSpinner } from '@multi-cart/react-ui';
=======
import { useIsAuth, AppLayout } from '@multi-cart/react-shared-components';
>>>>>>> main
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { EditCartContainer } from '../../appViews/EditCartContainer';

const EditCartPage: NextPage = () => {
<<<<<<< HEAD
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
=======
    useIsAuth();

    return (<AppLayout><EditCartContainer /></AppLayout>);
>>>>>>> main
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditCartPage);
