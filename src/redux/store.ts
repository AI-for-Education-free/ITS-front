import { configureStore } from '@reduxjs/toolkit';
// 引入 reducer 的集合
import rootReducers from "./reducers"; 

const store = configureStore({
    reducer: rootReducers,
});

// 导出 Store 中的状态（state）类型
export type RootState = ReturnType<typeof store.getState>;

// 导出更改状态的 Dispatch 方法类型
export type AppDispatch = typeof store.dispatch;

export default store;