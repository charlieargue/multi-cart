import { render } from '@testing-library/react';

import FilterableAccountTable from './FilterableAccountTable';

describe('FilterableAccountTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterableAccountTable />);
    expect(baseElement).toBeTruthy();
  });
});
