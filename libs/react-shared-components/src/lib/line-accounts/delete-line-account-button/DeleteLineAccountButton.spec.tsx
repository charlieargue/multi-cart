import { render } from '@testing-library/react';

import DeleteLineAccountButton from './DeleteLineAccountButton';

describe('DeleteLineAccountButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteLineAccountButton />);
    expect(baseElement).toBeTruthy();
  });
});
