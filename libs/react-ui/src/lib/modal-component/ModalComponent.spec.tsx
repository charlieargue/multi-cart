import React from 'react';
import { render } from '@testing-library/react';

import ModalComponent from './ModalComponent';

describe('ModalComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalComponent />);
    expect(baseElement).toBeTruthy();
  });
});
