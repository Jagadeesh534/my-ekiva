import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  students: [],
  selectedClassObj: null
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
    selectedStudnet: (state, action)=>{
      state.selectedStudent = action.payload;
    },
    // Select Class & section
    setSelectedClassObj: (state, action) => {
      state.selectedClassObj = action.payload;
      console.log("Selected Class Object:", action.payload);
    }
  },
});

// Export Actions
export const { fetchStudents, addStudent, editStudent, deleteStudent ,selectedStudnet,setSelectedClassObj} =
  studentSlice.actions;

// Export Reducer
export default studentSlice.reducer;
