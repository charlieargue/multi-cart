import React from 'react';
import { render } from '@testing-library/react';

import LineAccountContainer from './LineAccountContainer';

describe('LineAccountContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineAccountContainer />);
    expect(baseElement).toBeTruthy();
  });
});
