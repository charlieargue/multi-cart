// -------------------------------------
// ACTION TYPES (string constants)
// -------------------------------------
// TODO: check for better patterns/standard ways of writing these Actions/Types/etc.
export const typeActionFetching = {
    start: 'FETCHING_START',
    stop: 'FETCHING_STOP',
};
export const typeActionIsDeletingCart = {
    toggle: 'TOGGLE_IS_DELETING_CART',
};


// -------------------------------------
// ACTIONS (objects pre-populated w/ types)
// -------------------------------------
export const actionFetchingStart = {
    type: typeActionFetching.start,
};

export const actionFetchingStop = {
    type: typeActionFetching.stop,
};
export const actionIsDeletingCart = {
    type: typeActionIsDeletingCart.toggle,
};