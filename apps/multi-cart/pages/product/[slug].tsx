import { createUrqlClient } from '@multi-cart/react-data-access';
import { useIsAuth } from '@multi-cart/react-shared-components';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import ProductContainer from '../../appViews/products/ProductContainer';

const ProductPage: NextPage = () => {
  useIsAuth(); // 🛡 session authentication
  
  return <ProductContainer />;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ProductPage);