import { typeActionFetching } from "..";

// keeping it simple, not combining reducers, simple one bstate, etc.
export interface StateType {
    isFetching: boolean;
}

const initialState: StateType = {
    isFetching: false,
};

export const appStateReducer = (state = initialState, action: any) => {
    // AKA DISPATCHER!
    switch (action.type) {

        // --------------
        case typeActionFetching.start:
            return {
                ...state,
                isFetching: true
            };
            break;
        // --------------
        case typeActionFetching.stop:
            return {
                ...state,
                isFetching: false
            };
            break;

        // --------------
        default:
            return state;
    }

};