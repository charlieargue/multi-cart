import React from 'react';
import { render } from '@testing-library/react';

import { CategoriesDropDown } from '@multi-cart/react-shared-components';

describe('CategoriesDropDown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoriesDropDown />);
    expect(baseElement).toBeTruthy();
  });
});
