import { render } from '@testing-library/react';

import LineAccountValidators from './LineAccountValidators';

describe('LineAccountValidators', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineAccountValidators />);
    expect(baseElement).toBeTruthy();
  });
});
