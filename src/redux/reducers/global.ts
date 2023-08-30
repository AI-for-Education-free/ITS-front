import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

const globalSlicer = createSlice({
  name: "global",
  initialState: {
    hasFooter: true
  },
  reducers: {
    setFooter: (state, action) => {
      state.hasFooter = action.payload;
    }
  }
});

export const { setFooter } = globalSlicer.actions;

export const globalSelector = (state: RootState) => {
  return {
    "hasFooter": state.global.hasFooter
  }
};

export default globalSlicer.reducer;