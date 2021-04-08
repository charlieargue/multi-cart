import React from 'react';
import { render } from '@testing-library/react';

import ChangePassword from './ChangePassword';

describe('ChangePassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChangePassword />);
    expect(baseElement).toBeTruthy();
  });
});
