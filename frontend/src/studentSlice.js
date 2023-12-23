import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        "studentApi/endpoints/getStudents/fulfilled",
        (state, action) => {
          console.log("Received payload:", action.payload);
          state.data = action.payload;
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addCase("studentApi/endpoints/getStudents/pending", (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase("studentApi/endpoints/getStudents/rejected", (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default studentSlice.reducer;
