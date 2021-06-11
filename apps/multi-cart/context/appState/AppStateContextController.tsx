import React from 'react';
import AppStateContext from './AppStateContext';

// -------------------------------------
// DECOMISH (or re-name & use for global settings like compace/large view, etc..)
// -------------------------------------

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppStateContextControllerProps {
  children?: React.ReactNode;
}

export const AppStateContextController = ({ children }: AppStateContextControllerProps) => {
  // const [isFetching, setIsFetching] = useState(false);

  return <AppStateContext.Provider value={{ /* isFetching, setIsFetching */ }}>{children}</AppStateContext.Provider>;
};
