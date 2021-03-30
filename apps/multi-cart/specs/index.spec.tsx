import { findByText, render } from '@testing-library/react';
import React from 'react';
import Index from '../pages/index';

// thx: https://github.com/juristr/egghead-scale-react-dev-with-nx/blob/16-adjust-jest-tests/apps/store/src/app/app.spec.tsx
function mockFetch(data) {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => data,
    });
  });
}

// -------------------
describe('Index', () => {

  beforeEach(() => {
    window.fetch = mockFetch([]);
  });

  it('should render successfully', async () => {
    const { baseElement } = render(<Index pageProps={{}} />);
    expect(baseElement).toBeTruthy();
    expect(await findByText(baseElement, 'Dashboard')).toBeTruthy();

  });

  // it('should render successfully', async () => {
  //   const { baseElement } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   const element = await findByTestId(baseElement, 'app-container');
  //   expect(element).toBeTruthy();
  // });

  // it('should have a greeting as the title', async () => {
  //   const { baseElement } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   expect(await findByText(baseElement, 'Board Game Hoard')).toBeTruthy();
  // });
});
