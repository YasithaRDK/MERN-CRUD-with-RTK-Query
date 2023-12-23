import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/studentSlice";
import { studentApi } from "../features/studentApi";

const store = configureStore({
  reducer: {
    students: studentReducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});

export default store;
