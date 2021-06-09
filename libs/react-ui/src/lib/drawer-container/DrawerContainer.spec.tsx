import { render } from '@testing-library/react';

import DrawerContainer from './DrawerContainer';

describe('DrawerContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DrawerContainer />);
    expect(baseElement).toBeTruthy();
  });
});
