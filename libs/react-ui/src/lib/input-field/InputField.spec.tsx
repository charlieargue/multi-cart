import React from 'react';
import { render } from '@testing-library/react';

import InputField from './InputField';

describe('InputField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputField />);
    expect(baseElement).toBeTruthy();
  });
});
