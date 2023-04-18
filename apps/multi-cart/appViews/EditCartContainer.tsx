import {
  useCartQuery,
  useUpdateUserMutation,
} from '@multi-cart/react-data-access';
import {
  CartSkeletons,
  EditCartHeader,
  EditCartTable,
} from '@multi-cart/react-shared-components';
import { BigAlert, Breadcrumbs } from '@multi-cart/react-ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const EditCartContainer = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [isDeletingCart, setIsDeletingCart] = useState(false);
  const [, updateUser] = useUpdateUserMutation();
  const [{ data, error, fetching }] = useCartQuery({
    variables: {
      id,
    },
  });

  const links = [
    {
      isActive: true,
      label: 'Cart',
      href: `/cart/${id}`,
      id: data?.cart?.name,
    },
  ];

  useEffect(() => {
    updateUser({ currentCartId: id });
  }, [id, updateUser]);

  if (!fetching && !data?.cart && !isDeletingCart) {
    return (
      <>
        <Breadcrumbs links={links} />
        <BigAlert type="warning" title="Sorry...">
          <BigAlert.Message>
            Unfortunately, we could not find this cart!
          </BigAlert.Message>
        </BigAlert>
      </>
    );
  }

  if (!id || fetching || !data?.cart) {
    return (
      <>
        <Breadcrumbs links={links} />
        <CartSkeletons />
      </>
    );
  }

  if (error) {
    console.log('🚀 ~ error', error);
    return (
      <>
        <Breadcrumbs links={links} />
        <BigAlert type="error" title="Ooops, sorry! An error occurred:">
          <BigAlert.Message>
            {error?.message || 'Unknown error, contact support please.'}
          </BigAlert.Message>
        </BigAlert>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs links={links} />
      <EditCartHeader cart={data?.cart} />
      <EditCartTable cart={data?.cart} setIsDeletingCart={setIsDeletingCart} />
    </>
  );
};
