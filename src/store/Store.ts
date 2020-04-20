import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "../reducers/reducer";

const isDebug = process.env.NODE_ENV !== "production";
const middleware = [];
if (isDebug) {
  middleware.push(logger);
}
middleware.push(thunk);
export const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);
