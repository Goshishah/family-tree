const INITIAL_STATE = null;

const TYPE_SET_TREE = "TYPE_SET_TREE";
const TYPE_UPDATE_NODE_TEXT = "TYPE_UPDATE_NODE_TEXT";

//TREE REDUCER
const treeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE_SET_TREE:
      return { ...state, ...action.payload };
    case TYPE_UPDATE_NODE_TEXT:
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
const updateNodeTextAction = (payload) => ({
  type: TYPE_UPDATE_NODE_TEXT,
  payload,
});

export { setTreeAction, updateNodeTextAction, treeReducer };
