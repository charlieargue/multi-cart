import React, { useState } from 'react';
import AppStateContext from './AppStateContext';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppStateContextControllerProps {
  children?: React.ReactNode;
}

export const AppStateContextController = ({ children }: AppStateContextControllerProps) => {
  const [isFetching, setIsFetching] = useState(false);

  return <AppStateContext.Provider value={{ isFetching, setIsFetching }}>{children}</AppStateContext.Provider>;
};
