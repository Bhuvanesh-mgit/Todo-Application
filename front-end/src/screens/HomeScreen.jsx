import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HomeScreen.css";
import { useGetTodosQuery,useCreateTodoMutation,useDeleteTodoMutation } from "../slices/todoApiSlice";
import { useSelector,useDispatch } from "react-redux";
import {useLogoutUserMutation} from "../slices/userApiSlice";
import {logout} from "../slices/authSlice";
import { toast } from "react-toastify";


function HomeScreen() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  const {data: todos, refetch} = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const {userData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUserMutation] = useLogoutUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await createTodo({ title, description, userId: userData._id }).unwrap();
      refetch();
      setTitle("");
      setDescription("");
      toast.success("Todo created successfully!");
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Error creating todo.");
    }
  };
  const handleDelete = async (id) => {
    try {
      let res = await deleteTodo({ id }).unwrap();
      refetch();
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error deleting todo.");
    }
  };
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData]);

  return (
    <>
      <div className="home-header">
        <button className="home-logout-button" onClick={async () => {
          try {
            await logoutUserMutation().unwrap();
            toast.success("Logged out successfully!");
            dispatch(logout());
            navigate("/login");
          } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Error logging out.");
          }
        }}>
          Logout
        </button>
      </div>
      <div className="home-container">
        <div className="input-home">
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
          </form>
        </div>
<div className="todos-container">
        {todos?.map((todo, index) => (
          <div className="todo-card">
            <h1 className="todo-title">{todo.title}</h1>
            <p className="todo-description">{todo.description}</p>
            <div className="button-edit-delete">
            <button
              className="delete-button"
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
            <button
              className="edit-button"
              onClick={() => navigate(`/edit/${todo._id}`)}
            >
              Edit
            </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default HomeScreen;
