// ##################################################################################
// pure ACTIONS
// ##################################################################################
export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PERCENTAGE_MAP': {
      return { ...state, ...action.percentageMap };
    }
    case 'UPDATE_LINE_ACCOUNTS': {
      return { ...state };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
