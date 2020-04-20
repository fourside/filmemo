import { combineReducers } from "redux";
import { UserActionTypes, ACTIONS } from "../actions/types";
import { emptyUser } from "../model/User";

const userReducer = (state = emptyUser, action: UserActionTypes) => {
  switch(action.type) {
    case ACTIONS.SIGN_IN_REQUEST:
      return state;
    case ACTIONS.SIGN_IN_SUCCESS:
      return action.payload;
    case ACTIONS.SIGN_OUT_REQUEST:
    case ACTIONS.SIGNED_OUT:
      return action.payload;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: userReducer,
});
