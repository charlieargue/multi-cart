import { typeActionFetching } from "..";

// keeping it simple, not combining reducers, simple one bstate, etc.
const initialState = {
    isFetching: null,
};

export const appStateReducer = (state = initialState, action: any) => {
    // AKA DISPATCHER!
    switch (action.type) {

        // --------------
        case typeActionFetching.start:
            console.log(`🚀 ~ action.type`, action.type);
            return {
                ...state,
                isFetching: true
            };
            break;
        // --------------
        case typeActionFetching.stop:
            console.log(`🚀 ~ action.type`, action.type);
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