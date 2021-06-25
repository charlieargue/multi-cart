import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import ProductCard from './ProductCard';
import { ProductsMockData as products } from '@multi-cart/mock-api';
import { withNextRouter } from 'storybook-addon-next-router';
import { Product } from './ProductTypes';

export default {
  component: ProductCard,
  title: 'ProductCard',
  decorators: [withNextRouter],
};

export const primary = () => {


  return <SimpleGrid minChildWidth="320px" spacing="40px">
    {products.map((product) => (
      <ProductCard key={(product as Product).slug} product={product as Product} />
    ))}
  </SimpleGrid>;
};

primary.parameters = {
  nextRouter: {
    path: '/profile/[id]',
    asPath: '/profile/lifeiscontent',
    query: {
      username: 'abracadabra',
    },
  },
};