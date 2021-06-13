import { render } from '@testing-library/react';

import SideBarItem from './SideBarItem';

describe('SideBarItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SideBarItem />);
    expect(baseElement).toBeTruthy();
  });
});
