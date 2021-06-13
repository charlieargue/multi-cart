import { createUrqlClient } from '@multi-cart/react-data-access';
import { useIsAuth } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import ProductsContainer from '../../appViews/products/ProductsContainer';

const ProductsPage: NextPage = () => {
  useIsAuth(); // 🛡 session authentication

  return <ProductsContainer />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ProductsPage);