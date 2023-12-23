import express from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  getOneStudents,
  updateStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.route("/").get(getAllStudents).post(addStudent);

router
  .route("/:id")
  .get(getOneStudents)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
