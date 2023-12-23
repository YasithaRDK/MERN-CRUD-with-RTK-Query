import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const STUDENT_URL = "/api/students";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery,
  tagType: ["students"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: `${STUDENT_URL}`,
        method: "GET",
      }),
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getStudent: builder.query({
      query: (id) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
