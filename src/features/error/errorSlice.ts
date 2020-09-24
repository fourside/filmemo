import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    error(state, action: PayloadAction<string>) {
      return action.payload;
    },
    errorNext(state, action: PayloadAction<string>) {
      return action.payload;
    },
    clearError() {
      return "";
    },
  },
});

export const {
  error,
  errorNext,
  clearError,
} = errorSlice.actions;

export const errorReducer = errorSlice.reducer;
