import React from 'react';
import { render } from '@testing-library/react';

import AppLayout from './AppLayout';

describe('AppLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppLayout />);
    expect(baseElement).toBeTruthy();
  });
});
