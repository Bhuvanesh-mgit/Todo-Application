import express from "express";
import {
  getTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../Controllers/todoControllers.js";
import { protect } from "../middleWare/authMiddleware.js";

const routes = express.Router();
// http://localhost:4000/api/todo
routes.get("/", protect, getTodos);
// http://localhost:4000/api/todo/create
routes.post("/create", protect, createTodo);
// http://localhost:4000/api/todo/:id
routes.get("/:id", protect, getTodoById);
// http://localhost:4000/api/todo/delete
routes.delete("/delete", protect, deleteTodo);
// http://localhost:4000/api/todo/update
routes.patch("/update", protect, updateTodo);

export default routes;
