import { render } from '@testing-library/react';

import EditCartTableFooter from './EditCartTableFooter';

describe('EditCartTableFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditCartTableFooter />);
    expect(baseElement).toBeTruthy();
  });
});
