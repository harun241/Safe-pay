import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from './Slices/userInfoSlice'

export const store = configureStore({
    reducer: {
      userInfo:userInfoReducer
  },
});
