export interface StateType {
    isGlobalFetching: boolean;
    isDeletingCart: boolean;
}

export const initialState: StateType = {
    isGlobalFetching: false,
    isDeletingCart: false,
};
