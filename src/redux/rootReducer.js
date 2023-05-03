import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import reportReducer from "./reportReducer"

export default combineReducers({
  authReducer,
  messageReducer,
  reportReducer,
});
