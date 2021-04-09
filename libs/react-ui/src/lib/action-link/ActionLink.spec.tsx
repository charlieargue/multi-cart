import React from 'react';
import { render } from '@testing-library/react';

import ActionLink from './ActionLink';

describe('ActionLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActionLink />);
    expect(baseElement).toBeTruthy();
  });
});
