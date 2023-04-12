// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { useCartQuery } from '@multi-cart/react-data-access';
import {
  AppLayout,
  EditCartHeader,
  EditCartTable,
} from '@multi-cart/react-shared-components';
import { BigAlert, Breadcrumbs, FullScreenSpinner } from '@multi-cart/react-ui';
import { useRouter } from 'next/router';

// import { SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export const EditCartContainer = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [{ data, error, fetching }] = useCartQuery({
    variables: {
      id,
    },
  });

  // todo: separate component all this!
  // const cartSkeleton = (
  //   <Fade in={true}>
  //     <Box padding="6" boxShadow="lg" bg="white">
  //       <SkeletonCircle size="10" />
  //       <SkeletonText mt="4" noOfLines={4} spacing="4" />
  //     </Box>
  //     <Box padding="6" boxShadow="lg" bg="white" mt={8}>
  //       <SkeletonCircle size="10" />
  //       <SkeletonText mt="4" noOfLines={4} spacing="4" />
  //     </Box>
  //     <Box padding="6" boxShadow="lg" bg="white" mt={8}>
  //       <SkeletonCircle size="10" />
  //       <SkeletonText mt="4" noOfLines={4} spacing="4" />
  //     </Box>
  //   </Fade>
  // );

  // todo: separate component all this!
  const links = [
    {
      isActive: true,
      label: 'Cart',
      href: `/cart/${id}`,
      id: data?.cart?.name,
    },
  ];
  const breadcrumbs = <Breadcrumbs links={links} />;

  // const isDeletingCart = useSelector(
  //   (state: StateType) => state?.isDeletingCart
  // );
  // const [, updateUser] = useUpdateUserMutation();

  // what? this shouldn't be here....
  // useEffect(() => {
  //   updateUser({ currentCartId: id });
  // }, [id, updateUser]);

  // fetching?
  // TODO: loading indicator
  // if (fetching) {
  //   return (
  //     <>
  //       {breadcrumbs}
  //       {cartSkeleton}
  //     </>
  //   );
  // }

  if (fetching || !data?.cart) {
    return <FullScreenSpinner />;
  }

  // big error
  // TODO: error boundary this, right?
  if (error) {
    console.log('🚀 ~ error', error);
    return (
      <>
        {breadcrumbs}
        <BigAlert type="error" title="Ooops, sorry! An error occurred:">
          <BigAlert.Message>{error.message}</BigAlert.Message>
        </BigAlert>
      </>
    );
  }

  // bad cart ID?
  // if (!cart && !isDeletingCart) {
  //   return (
  //     <>
  //       {breadcrumbs}
  //       <BigAlert type="warning" title="Sorry...">
  //         <BigAlert.Message>
  //           Unfortunately, we could not find this cart!
  //         </BigAlert.Message>
  //       </BigAlert>
  //     </>
  //   );
  // }

  // TODO: DRY this UI here
  return (
    <AppLayout>
      {breadcrumbs}
      <EditCartHeader cart={data?.cart} />
      <EditCartTable cart={data?.cart} />
    </AppLayout>
  );
};
