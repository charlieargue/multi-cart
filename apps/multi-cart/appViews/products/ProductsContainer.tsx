import { Alert, Divider, SimpleGrid } from '@chakra-ui/react';
import { AppLayout, Product, ProductCard } from '@multi-cart/react-shared-components';
import { Breadcrumbs } from '@multi-cart/react-ui';
import React from 'react';
import { ProductsMockData as products } from './ProductsMockData';

/* eslint-disable-next-line */
export interface ProductsContainerProps { }

export function ProductsContainer(props: ProductsContainerProps) {

  const links = [{
    isActive: true,
    label: "Products",
    href: `/products`
  }];
  const breadcrumbs = (<Breadcrumbs links={links} />);

  return (
    <AppLayout>
      {breadcrumbs}
      <SimpleGrid minChildWidth="420px" spacing="20px">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </SimpleGrid>

    </AppLayout>
  );
}

export default ProductsContainer;
