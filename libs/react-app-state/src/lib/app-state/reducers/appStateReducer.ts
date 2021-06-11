import { typeActionFetching } from "..";
import { Action } from 'redux';

// keeping it simple, not combining reducers, simple one bstate, etc.
export interface StateType {
    isFetching: boolean;
}

const initialState: StateType = {
    isFetching: false,
};

// TODO: more strongly-typed actions using this IAction method? https://stackoverflow.com/a/53412235/6200791 (or is there a newer/better way?)
export const appStateReducer = (state = initialState, action: Action) => {
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