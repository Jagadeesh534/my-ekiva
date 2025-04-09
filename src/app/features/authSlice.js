import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("access_token");

const initialState = {
  loginType: "",               // student | school | teacher
  userInfo: null,              // { userName, schoolName, email, etc. }
  menus: [],                   // Can be set from backend
  isAuthenticated: !!token,    // Check token at init
  profilePath: "",             // Dynamic profile route
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      debugger
      const { loginType, userInfo, token, menus } = action.payload;
      state.loginType = loginType;
      state.userInfo = userInfo || null;
      state.menus = menus || [];
      state.isAuthenticated = true;
      state.profilePath = `/dashboard/profile-${loginType}`;

      if (token) {
        localStorage.setItem("access_token", token);
      }
    },

    logout: (state) => {
      state.loginType = "";
      state.userInfo = null;
      state.menus = [];
      state.isAuthenticated = false;
      state.profilePath = "";
      localStorage.removeItem("access_token");
    },

    updateMenus: (state, action) => {
      state.menus = action.payload;
    },

    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLoginType: (state,action)=>{
      state.loginType = action.payload;
    }
  },
});

export const { loginSuccess, logout, updateMenus, updateUserInfo,setLoginType } = authSlice.actions;
export default authSlice.reducer;
