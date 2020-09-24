import { createSlice } from "@reduxjs/toolkit";

const processing = createSlice({
  name: "processing",
  initialState: false,
  reducers: {
    request() {
      return true;
    },
    done() {
      return false;
    },
  },
});

export const {
  request,
  done,
} = processing.actions;

export const processingReducer = processing.reducer;
