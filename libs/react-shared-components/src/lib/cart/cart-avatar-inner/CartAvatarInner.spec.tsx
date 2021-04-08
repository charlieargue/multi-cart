import React from 'react';
import { render } from '@testing-library/react';

import CartAvatarInner from './CartAvatarInner';

describe('CartAvatarInner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartAvatarInner />);
    expect(baseElement).toBeTruthy();
  });
});
