import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import studentReducer from "./features/studentSlice";

// Configure store
const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
  },
});

export default store;
