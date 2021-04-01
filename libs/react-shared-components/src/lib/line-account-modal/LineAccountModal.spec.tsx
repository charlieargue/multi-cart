import React from 'react';
import { render } from '@testing-library/react';

import LineAccountModal from './LineAccountModal';

describe('LineAccountModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineAccountModal />);
    expect(baseElement).toBeTruthy();
  });
});
