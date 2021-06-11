import { createContext, Dispatch, SetStateAction } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppStateContextProps {
    isFetching: boolean;
    setIsFetching: Dispatch<SetStateAction<boolean>>;
}

export const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);
export default AppStateContext;