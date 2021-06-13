import { render } from '@testing-library/react';

import LineAccountTooltip from './LineAccountTooltip';

describe('LineAccountTooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LineAccountTooltip />);
    expect(baseElement).toBeTruthy();
  });
});
