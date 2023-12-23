import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";

export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().sort({ _id: -1 });
  res.status(200).json(students);
});

export const getOneStudents = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    res.status(404);
    throw new Error("Student record not found");
  }
  res.status(200).json(student);
});

export const addStudent = asyncHandler(async (req, res) => {
  const { name, contact, email } = req.body;
  if (!name || !contact || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const student = await Student.create({ name, contact, email });
  res.status(200).json(student);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, contact, email } = req.body;
  const student = await Student.findById(id);
  if (!student) {
    res.status(404);
    throw new Error("Student record not found");
  }
  if (!name || !contact || !email) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    { name, contact, email },
    { new: true }
  );
  res.status(200).json(updatedStudent);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    res.status(404);
    throw new Error("Student record not found");
  }
  await Student.findByIdAndDelete(id);
  res.status(200).json({ id });
});
