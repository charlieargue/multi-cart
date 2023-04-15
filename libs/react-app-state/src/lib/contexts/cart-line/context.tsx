import * as React from 'react';
import { dispatchMiddleware } from './dispatch-middleware';
import { reducer } from './reducer';
import { useReducer } from 'react';
import { initialState } from './state';

const CartLineContext = React.createContext(undefined);

// thx: https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42#solution-3
export const CartLineContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(`🚀  state:`, state);

  const pureDispatchMiddleware = React.useMemo(
    () => dispatchMiddleware(dispatch, state),
    [dispatch, state]
  );

  return (
    <CartLineContext.Provider
      {...props}
      value={pureDispatchMiddleware}
    />
  );
};

export const useCartLineContext = () => {
  const context = React.useContext(CartLineContext);
  if (!context) {
    throw new Error('useCartLineContext must be used within a CartLineContext');
  }
  // not exposing state, only dispatch
  return context as any;
};
