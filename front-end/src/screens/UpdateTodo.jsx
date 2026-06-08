import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useUpdateTodoMutation,
  useGetTodoByIdQuery,
  useGetTodosQuery,
} from "../slices/todoApiSlice";
import "./UpdateTodo.css";
import { toast } from "react-toastify";

function UpdateTodo() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [updateTodo] = useUpdateTodoMutation();
  const { data: todo,refetch } = useGetTodoByIdQuery(id);
  const {data,refetch:refetchTodos} = useGetTodosQuery();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [isCompleted, setIsCompleted] = useState(false);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTodo({ id, title, description, isCompleted }).unwrap();
      toast.success("Todo updated successfully!");
      refetch();
      refetchTodos();
      navigate("/");
    } catch (error) {
      toast.error("Error updating todo.");
    }
  };

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setIsCompleted(todo.isCompleted);
    }
  }, [todo]);

  return (
    <div className="update-todo-container">
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateTodo;
