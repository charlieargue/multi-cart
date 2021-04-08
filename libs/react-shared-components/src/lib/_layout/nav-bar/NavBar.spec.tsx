import React from 'react';
import { render } from '@testing-library/react';

import NavBar from './NavBar';

describe('NavBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavBar />);
    expect(baseElement).toBeTruthy();
  });
});
