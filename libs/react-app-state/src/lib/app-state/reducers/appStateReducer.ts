import { Action } from 'redux';
import { typeActionFetching, initialState } from "..";

export const appStateReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case typeActionFetching.start:
            return {
                ...state,
                isGlobalFetching: true
            };
            break;
        case typeActionFetching.stop:
            return {
                ...state,
                isGlobalFetching: false
            };
            break;
        default:
            return state;
    }

};