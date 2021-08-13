import { combineReducers } from "redux";
import { generalReducer } from "./generalReducer";
import { authReducer } from "./authReducer";
import { treeReducer } from "./treeReducer";

const appReducer = combineReducers({
  user: authReducer,
  general: generalReducer,
  tree: treeReducer,
});

export default appReducer;
