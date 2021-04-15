import React from 'react';
import { render } from '@testing-library/react';

import UOMDropDown from './UOMDropDown';

describe('UOMDropDown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UOMDropDown />);
    expect(baseElement).toBeTruthy();
  });
});
