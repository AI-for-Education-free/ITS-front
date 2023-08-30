import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

const userSlicer = createSlice({
  name: 'user',
  initialState: {
    name: "",
    login: false
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    login: (state) => {
      state.login = true;
    }
  }
});

// 返回更新 state 的 Action
export const { setName, login } = userSlicer.actions;

// Selector，作为 useSelector 读取数据的函数参数
export const userSelector = (state: RootState) => {
  return {
    "name": state.user.name,
    "login": state.user.login
  }
};

export default userSlicer.reducer;