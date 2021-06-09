import { render } from '@testing-library/react';

import AddLineAccountButton from './AddLineAccountButton';

describe('AddLineAccountButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddLineAccountButton />);
    expect(baseElement).toBeTruthy();
  });
});
