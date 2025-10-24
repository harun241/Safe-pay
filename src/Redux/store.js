import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from './Slices/userInfoSlice'
import transactionsReducer from './Slices/transactionsSlice'
import subscriptionReducer from './Slices/subscriptionSlice'

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    transactions: transactionsReducer,
    subscriptions: subscriptionReducer
  },
});
