import React from 'react';
import { render } from '@testing-library/react';

import CartLineRow from './CartLineRow';

describe('CartLineRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartLineRow />);
    expect(baseElement).toBeTruthy();
  });
});
