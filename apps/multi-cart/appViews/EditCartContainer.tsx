import {
  useCartQuery,
  useSaveAsCurrentCart,
} from '@multi-cart/react-data-access';
import {
  CartSkeletons,
  EditCartHeader,
  EditCartTable,
} from '@multi-cart/react-shared-components';
import { BigAlert, Breadcrumbs } from '@multi-cart/react-ui';
import { useState } from 'react';

interface EditCartContainerProps {
  id: string;
}

export const EditCartContainer = ({ id }: EditCartContainerProps) => {
  useSaveAsCurrentCart(id);
  const [isDeletingCart, setIsDeletingCart] = useState(false);
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
