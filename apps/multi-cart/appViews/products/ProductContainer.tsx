import { AppLayout, Product, ProductDetails } from '@multi-cart/react-shared-components';
import { Breadcrumbs } from '@multi-cart/react-ui';
import { useRouter } from 'next/router';
import React from 'react';
import { ProductsMockData as products } from '@multi-cart/mock-api';

/* eslint-disable-next-line */
export interface ProductContainerProps { }

export function ProductContainer(props: ProductContainerProps) {
  const router = useRouter();
  const product: Product = products.find(p => p.slug === router.query.slug);

  const links = [
    {
      isActive: false,
      label: "Products",
      href: `/products`
    },
    {
      isActive: true,
      label: (product) ? product.name : "...",
      href: `/product/${router.query?.slug}`
    }
  ];
  const breadcrumbs = (<Breadcrumbs links={links} />);
  return (
    <AppLayout>
      {breadcrumbs}

      {/* MOCKED PRODUCT DETAILS  */}
      <ProductDetails product={product} />
    </AppLayout>
  );
}

export default ProductContainer;
