import React, { useState, useCallback, useEffect } from 'react';
import { AppStateContext } from '@multi-cart/react-data-access'; // TMP 🔴 🔴 🔴 🔴 🔴 

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppStateContextControllerProps {
  children?: React.ReactNode;
}

export const AppStateContextController = ({ children }: AppStateContextControllerProps) => {
  const [isFetching, setIsFetching] = useState(false);

  return <AppStateContext.Provider value={{ isFetching, setIsFetching }}>{children}</AppStateContext.Provider>;
};
