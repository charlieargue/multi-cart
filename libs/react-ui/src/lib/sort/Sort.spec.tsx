import { render } from '@testing-library/react';

import Sort from './Sort';

describe('Sort', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sort />);
    expect(baseElement).toBeTruthy();
  });
});
