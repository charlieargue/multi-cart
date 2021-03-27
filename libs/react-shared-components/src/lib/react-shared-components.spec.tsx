import React from 'react';
import { render } from '@testing-library/react';

import ReactSharedComponents from './react-shared-components';

describe('ReactSharedComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactSharedComponents />);
    expect(baseElement).toBeTruthy();
  });
});
