import React from 'react';
import { render } from '@testing-library/react';

import CartNameEditable from './CartNameEditable';

describe('CartNameEditable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartNameEditable />);
    expect(baseElement).toBeTruthy();
  });
});
