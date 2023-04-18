// TODO: upgrade to RTK
// ACTION string constants
export const typeActionFetching = {
    start: 'FETCHING_START',
    stop: 'FETCHING_STOP',
};


// ACTIONS TYPE OBJECTS
export const actionFetchingStart = {
    type: typeActionFetching.start,
};

export const actionFetchingStop = {
    type: typeActionFetching.stop,
};