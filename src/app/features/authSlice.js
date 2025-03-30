import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginType: "", // Login Type: student, school, teacher
  menus: [], // To store menu options
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginType: (state, action) => {
      state.loginType = action.payload;

      // Set dynamic menus based on login type
      switch (action.payload) {
        case "student":
          state.menus = [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Courses", path: "/courses" },
            { name: "Profile", path: "/profile" },
          ];
          break;
        case "school":
          state.menus = [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Manage Students", path: "/manage-students" },
            { name: "Teachers", path: "/teachers" },
            { name: "Reports", path: "/reports" },
            { name: "Profile", path: "/profile" },
          ];
          break;
        case "teacher":
          state.menus = [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Assignments", path: "/assignments" },
            { name: "Students", path: "/students" },
            { name: "Profile", path: "/profile" },
          ];
          break;
        default:
          state.menus = [];
      }
    },
    clearLoginType: (state) => {
      state.loginType = "";
      state.menus = [];
    },
  },
});

export const { setLoginType, clearLoginType } = authSlice.actions;
export default authSlice.reducer;
