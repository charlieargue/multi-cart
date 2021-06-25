import { Alert, AlertIcon, SimpleGrid, Text } from '@chakra-ui/react';
import { AppLayout, ProductCard } from '@multi-cart/react-shared-components';
import { Breadcrumbs } from '@multi-cart/react-ui';
import React from 'react';
import { ProductsMockData as products } from '@multi-cart/mock-api';

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
      <Alert borderRadius="4px" variant="left-accent" status="info" colorScheme="pink" mb="8">
        <AlertIcon />
        <Text>These are all <strong>mocked</strong> products <strong>&nbsp;and the images change</strong> because they're dynamically generated ... <span role='img' aria-label='emoji'>🛍</span> &nbsp;but you can still <strong>add them to your cart</strong>!</Text>
      </Alert>
      <SimpleGrid minChildWidth="320px" spacing="40px">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </SimpleGrid>
    </AppLayout>
  );
}

export default ProductsContainer;
