import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginType: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginType: (state, action) => {
      state.loginType = action.payload;
    },
    clearLoginType: (state) => {
      state.loginType = "";
    },
  },
});

export const { setLoginType, clearLoginType } = authSlice.actions;

export default authSlice.reducer;
