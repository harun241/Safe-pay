import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from './Slices/userInfoSlice'
import transactionsReducer from './Slices/transactionsSlice'

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    transactions: transactionsReducer
  },
});
