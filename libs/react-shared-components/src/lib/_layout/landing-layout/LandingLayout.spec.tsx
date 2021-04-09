import React from 'react';
import { render } from '@testing-library/react';

import LandingLayout from './LandingLayout';

describe('LandingLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingLayout />);
    expect(baseElement).toBeTruthy();
  });
});
