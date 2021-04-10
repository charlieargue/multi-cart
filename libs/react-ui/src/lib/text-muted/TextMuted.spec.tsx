import React from 'react';
import { render } from '@testing-library/react';

import TextMuted from './TextMuted';

describe('TextMuted', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextMuted />);
    expect(baseElement).toBeTruthy();
  });
});
