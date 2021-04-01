import React from 'react';
import { render } from '@testing-library/react';

import LineAccountButtonRow from './LineAccountButtonRow';

describe('LineAccountButtonRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineAccountButtonRow />);
    expect(baseElement).toBeTruthy();
  });
});
