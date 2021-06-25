import React from 'react';
import { ProductsMockData as products } from '@multi-cart/mock-api';
import ProductDetails from './ProductDetails';
import { withNextRouter } from 'storybook-addon-next-router';
import { Product } from '../product-card/ProductTypes';

export default {
  component: ProductDetails,
  title: 'ProductDetails',
  decorators: [withNextRouter],
};

export const primary = () => {
  return <ProductDetails product={products[3] as Product} />;
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