// ##################################################################################
// ASYNC ACTIONS
// ##################################################################################
export const dispatchMiddleware = (dispatch, state) => {
  return async (action) => {
    switch (action.type) {
      case 'UPDATE_LINE_ACCOUNTS':
        for await (const key of Object.keys(state)) {
          const newPercentage: number = state[key];
          const lineAccountId: string = key;
          await action.saveFn(newPercentage, lineAccountId);
        }
        break;

      default:
        return dispatch(action);
    }
  };
};
