import { render } from '@testing-library/react';

import ErrMsg from './ErrMsg';

describe('ErrMsg', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrMsg />);
    expect(baseElement).toBeTruthy();
  });
});
