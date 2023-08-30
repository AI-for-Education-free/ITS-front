import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../store";
import { defaultFetchState } from "./index";


const initialState = {
  userNameValidation: {
    isValidUsername: false,
    fetchState: { ...defaultFetchState }
  }
};


const userSlicer = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    
  }
});