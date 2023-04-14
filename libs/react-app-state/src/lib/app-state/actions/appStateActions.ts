// ACTION string constants
export const typeActionFetching = {
    start: 'FETCHING_START',
    stop: 'FETCHING_STOP',
};
export const typeActionIsDeletingCart = {
    toggle: 'TOGGLE_IS_DELETING_CART',
};


// ACTIONS TYPE OBJECTS
export const actionFetchingStart = {
    type: typeActionFetching.start,
};

export const actionFetchingStop = {
    type: typeActionFetching.stop,
};
export const actionIsDeletingCart = {
    type: typeActionIsDeletingCart.toggle,
};