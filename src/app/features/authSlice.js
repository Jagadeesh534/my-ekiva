import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("access_token");

const initialState = {
  loginType: "", // student | school | teacher
  userInfo: null, // { userName, schoolName, email, etc. }
  menus: [], // Can be set from backend
  isAuthenticated: !!token, // Check token at init
  profilePath: "",
  schoolStats: null,
  school: null, // Dynamic profile route
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loginType = action.payload.user.user_type;
      state.userInfo = action.payload.user || null;
      state.menus = action.payload.menus || [];
      state.isAuthenticated = true;
      state.profilePath = `/dashboard/profile-${state.loginType}`;
      state.school = action.payload.school;

      if (token) {
        localStorage.setItem("access_token", token);
      }
      if (state.userInfo.user_type !== "schooladmin") {
        state.menus = [
          { name: "Dashboard", path: "/dashboard" },
          { name : "Smart-Class", path: "/dashboard/smart-class" },
          { name : "Assignments", path: "/dashboard/assignments" }
      ];
      }
    },

    logout: (state) => {
      state.loginType = "";
      state.userInfo = null;
      state.menus = [];
      state.isAuthenticated = false;
      state.profilePath = "";
      localStorage.removeItem("access_token");
      state.schoolStats = null;
      state.school = null;
    },

    updateMenus: (state, action) => {
      state.menus = action.payload;
    },

    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLoginType: (state, action) => {
      state.loginType = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logout,
  updateMenus,
  updateUserInfo,
  setLoginType,
} = authSlice.actions;
export default authSlice.reducer;
