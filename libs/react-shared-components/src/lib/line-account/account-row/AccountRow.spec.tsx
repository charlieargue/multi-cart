import { render } from '@testing-library/react';

import AccountRow from './AccountRow';

describe('AccountRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountRow />);
    expect(baseElement).toBeTruthy();
  });
});
