import { render } from '@testing-library/react';

import CartLineForm from './CartLineForm';

describe('CartLineForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartLineForm />);
    expect(baseElement).toBeTruthy();
  });
});
