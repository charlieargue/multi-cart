import React from 'react';
import { render } from '@testing-library/react';

import DividerWithText from './DividerWithText';

describe('DividerWithText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DividerWithText />);
    expect(baseElement).toBeTruthy();
  });
});
