const INITIAL_STATE = null;

const TYPE_SET_TREE = "TYPE_SET_TREE";

//TREE REDUCER
const treeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE_SET_TREE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

//TREE ACTION

const setTreeAction = (payload) => ({
  type: TYPE_SET_TREE,
  payload,
});

export { setTreeAction, treeReducer };
