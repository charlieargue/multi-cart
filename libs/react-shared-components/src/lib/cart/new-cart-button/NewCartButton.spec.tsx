import React from 'react';
import { render } from '@testing-library/react';

import NewCartButton from './NewCartButton';

describe('NewCartButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewCartButton />);
    expect(baseElement).toBeTruthy();
  });
});
