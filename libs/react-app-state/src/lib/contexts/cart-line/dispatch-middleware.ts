// ##################################################################################
// ASYNC ACTIONS
// ##################################################################################
export const dispatchMiddleware = (dispatch, state) => {
  return async (action) => {
    switch (action.type) {
      case 'UPDATE_LINE_ACCOUNTS':
        console.log(
          `🚀 🔥 🔥 🔥 🔥  ASYNC ACTION fired! action:`,
          action,
          state
        );
        // unlink(action.file, () => dispatch(action));
        // - [ ] iterate on this line's CLAs
        // - [ ] Use the `% map` to get freshest %
        // - [ ] Calculate and fire off `saveLA`
        for await (const key of Object.keys(state)) {
          console.log(`🚀  key:`, key);
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
