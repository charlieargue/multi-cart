import { render } from '@testing-library/react';

import EditCartTableHeader from './EditCartTableHeader';

describe('EditCartTableHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditCartTableHeader />);
    expect(baseElement).toBeTruthy();
  });
});
