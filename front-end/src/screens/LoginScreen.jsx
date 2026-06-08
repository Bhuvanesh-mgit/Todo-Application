import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userData} = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await loginUser({ email, password }).unwrap();
      toast.success(" logged in successfully!");
      await dispatch(setCredentials({ ...res.data }));
      navigate("/");
    } catch (error) {
      toast.error("Error logging in user.");
    }
  };
  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData]);

  return (
    <div className="input">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      <p className="register">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};
