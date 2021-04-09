import React from 'react';
import { render } from '@testing-library/react';

import DarkModeSwitch from './DarkModeSwitch';

describe('DarkModeSwitch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DarkModeSwitch />);
    expect(baseElement).toBeTruthy();
  });
});
