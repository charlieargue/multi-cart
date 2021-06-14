// keeping it simple, not combining reducers, simple one bstate, etc.
export interface StateType {
    isFetching: boolean;
    isDeletingCart: boolean;
}

export const initialState: StateType = {
    isFetching: false,
    isDeletingCart: false,
};
