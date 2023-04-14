// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { useCartQuery, useUpdateUserMutation } from '@multi-cart/react-data-access';
import {
  AppLayout,
  CartSkeletons,
  EditCartHeader,
  EditCartTable,
} from '@multi-cart/react-shared-components';
import { BigAlert, Breadcrumbs } from '@multi-cart/react-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const EditCartContainer = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [, updateUser] = useUpdateUserMutation();
  const [{ data, error, fetching }] = useCartQuery({
    variables: {
      id,
    },
  });

  // todo: separate component all this!
  const links = [
    {
      isActive: true,
      label: 'Cart',
      href: `/cart/${id}`,
      id: data?.cart?.name,
    },
  ];

  
  // const isDeletingCart = useSelector(
  //   (state: StateType) => state?.isDeletingCart
  // );

  useEffect(() => {
    updateUser({ currentCartId: id });
  }, [id, updateUser]);

  if (!id || fetching || !data?.cart) {
    return (
      <AppLayout>
        <Breadcrumbs links={links} />
        <CartSkeletons />
      </AppLayout>
    );
  }

  // TODO: error boundary this, right?
  if (error) {
    console.log('🚀 ~ error', error);
    return (
      <AppLayout>
        <Breadcrumbs links={links} />
        <BigAlert type="error" title="Ooops, sorry! An error occurred:">
          <BigAlert.Message>{error?.message || 'Unknown error, contact support please.'}</BigAlert.Message>
        </BigAlert>
      </AppLayout>
    );
  }

  // TODO: bad cart ID?
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

  // TODO: DRY this UI here (don't repeat AppLayout and Bread, rule of 3s!), wrap it!
  return (
    <AppLayout>
      <Breadcrumbs links={links} />
      <EditCartHeader cart={data?.cart} />
      <EditCartTable cart={data?.cart} />
    </AppLayout>
  );
};
