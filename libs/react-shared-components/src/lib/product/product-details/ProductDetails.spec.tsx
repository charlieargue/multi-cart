import { render } from '@testing-library/react';

import ProductDetails from './ProductDetails';

describe('ProductDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductDetails />);
    expect(baseElement).toBeTruthy();
  });
});
