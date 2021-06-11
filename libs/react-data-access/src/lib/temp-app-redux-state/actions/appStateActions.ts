// -------------------------------------
// ACTION TYPES
// -------------------------------------
export const typeActionFetching = {
    start: 'FETCHING_START',
    stop: 'FETCHING_STOP',
};


// -------------------------------------
// ACTIONS
// -------------------------------------
export const actionFetchingStart = {
    type: typeActionFetching.start,
};

export const actionFetchingStop = {
    type: typeActionFetching.stop,
};