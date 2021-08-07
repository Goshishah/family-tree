import { combineReducers } from "redux";
import { generalReducer } from "./generalReducer";
import { authReducer } from "./authReducer";

const appReducer = combineReducers({
  user: authReducer,
  general: generalReducer,
});

export default appReducer;
