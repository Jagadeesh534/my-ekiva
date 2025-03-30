import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

// Configure store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
