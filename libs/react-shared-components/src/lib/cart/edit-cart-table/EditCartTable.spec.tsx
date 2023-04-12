import { render } from '@testing-library/react';

import EditCartTable from './EditCartTable';

describe('EditCartTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditCartTable />);
    expect(baseElement).toBeTruthy();
  });
});
