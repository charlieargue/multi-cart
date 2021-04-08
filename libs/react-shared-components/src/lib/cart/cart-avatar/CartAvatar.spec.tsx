import React from 'react';
import { render } from '@testing-library/react';

import CartAvatar from './CartAvatar';

describe('CartAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartAvatar />);
    expect(baseElement).toBeTruthy();
  });
});
