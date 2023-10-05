import ThemeReducer from "./ThemeReducer";
import userReducer from './userReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({ ThemeReducer, user: userReducer })

export default rootReducer