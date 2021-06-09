import { render } from '@testing-library/react';

import CartAvatarRow from './CartAvatarRow';

describe('CartAvatarRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartAvatarRow />);
    expect(baseElement).toBeTruthy();
  });
});
