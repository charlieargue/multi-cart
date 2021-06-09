import { render } from '@testing-library/react';

import EditCartHeader from './EditCartHeader';

describe('EditCartHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditCartHeader />);
    expect(baseElement).toBeTruthy();
  });
});
