import { render } from '@testing-library/react';

import FullScreenSpinner from './FullScreenSpinner';

describe('FullScreenSpinner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FullScreenSpinner />);
    expect(baseElement).toBeTruthy();
  });
});
