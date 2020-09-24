import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "../reducers/reducer";

const middleWares = getDefaultMiddleware();

if (process.env.NODE_ENV !== "production") {
  middleWares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleWares,
});
