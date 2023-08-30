import {combineReducers} from '@reduxjs/toolkit';

import counterSlice from './counter' ;
import userSlice from './user';
import globalSlice from "./global";

export const defaultFetchState = {
  pending: true,
  complete: false,
  errored: false,
  error: null
};

const rootReducers = combineReducers({
  counter: counterSlice ,
  user: userSlice,
  global:  globalSlice
});


export default rootReducers;