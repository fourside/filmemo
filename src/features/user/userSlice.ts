import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { emptyUser, User } from "../../model/User";
import * as Auth from "../../amplify/Auth";

const user = createSlice({
  name: "user",
  initialState: emptyUser,
  reducers: {
    signInRequest(state) {
      return state;
    },
    signInSuccess(state, action: PayloadAction<User>) {
      return action.payload;
    },
    signOutRequest() {
      return emptyUser;
    },
    signedOut() {
      return emptyUser;
    },
  },
});

const {
  signInRequest,
  signInSuccess,
  signOutRequest,
  signedOut,
} = user.actions;

export const clearUser = signedOut;

export const userReducer = user.reducer;

type ThunkUserAction = ThunkAction<Promise<void | User>, User, undefined, Action<string>>;

export function signIn(): ThunkUserAction {
  return async function(dispatch) {
    dispatch(signInRequest());
    await Auth.signInGoogle();
  };
}

export function signedIn(): ThunkUserAction {
  return async (dispatch) => {
    const user = await Auth.getLoginUser();
    dispatch(signInSuccess(user));
  };
}

export function signOut(): ThunkUserAction {
  return async (dispatch) => {
    await Auth.signOut();
    dispatch(signOutRequest());
  };
}
