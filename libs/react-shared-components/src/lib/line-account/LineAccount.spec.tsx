import React from 'react';
import { render } from '@testing-library/react';

import LineAccount from './LineAccount';

describe('LineAccount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineAccount />);
    expect(baseElement).toBeTruthy();
  });
});
