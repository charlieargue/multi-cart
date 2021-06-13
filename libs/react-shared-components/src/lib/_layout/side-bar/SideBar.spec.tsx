import { render } from '@testing-library/react';

import SideBar from './SideBar';

describe('SideBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SideBar />);
    expect(baseElement).toBeTruthy();
  });
});
