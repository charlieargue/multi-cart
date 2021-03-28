import '../appViews/_theme/app.scss'; // 🔴 TODO: when this is fixed, put it back into @multi-cart/react-ui !!!
import React from 'react';

function MyApp({ Component, pageProps }: any) {

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
