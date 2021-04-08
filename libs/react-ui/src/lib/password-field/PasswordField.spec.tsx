import React from 'react';
import { render } from '@testing-library/react';

import PasswordField from './PasswordField';

describe('PasswordField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordField />);
    expect(baseElement).toBeTruthy();
  });
});
