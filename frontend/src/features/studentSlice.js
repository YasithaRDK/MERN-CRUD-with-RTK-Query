import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      const studentId = action.payload;
      state.students = state.students.filter(
        (student) => student.id !== studentId
      );
    },
  },
});

export const { setStudents, addStudent, updateStudent, deleteStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
