import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  students: [],
};

// Create Slice
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    // Fetch Students
    fetchStudents: (state, action) => {
      state.students = action.payload;
    },

    // Add Student
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },

    // Edit Student
    editStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },

    // Delete Student
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
  },
});

// Export Actions
export const { fetchStudents, addStudent, editStudent, deleteStudent } =
  studentSlice.actions;

// Export Reducer
export default studentSlice.reducer;
