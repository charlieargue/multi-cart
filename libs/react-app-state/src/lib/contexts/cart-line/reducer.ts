// ##################################################################################
// pure ACTIONS
// ##################################################################################
export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PERCENTAGE_MAP': {
      console.log(`🚀 pure synchronous ACTION fired! action:`, action);
      return { ...state, ...action.percentageMap, ...action.saveFn };
    }
    case 'UPDATE_LINE_ACCOUNTS': {
      console.log(`🚀 pure synchronous ACTION fired! action .... DOES NOTHING:`, action);
      return { ...state };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
