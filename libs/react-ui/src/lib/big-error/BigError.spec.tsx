import React from 'react';
import { render } from '@testing-library/react';

import BigError from './BigError';

describe('BigError', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BigError />);
    expect(baseElement).toBeTruthy();
  });
});
