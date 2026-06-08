import express from 'express';
import {registerUser, loginUser,logoutUser} from '../Controllers/userControler.js';

const userRoutes = express.Router();

// http://localhost:4000/api/user/register
userRoutes.post("/register", registerUser);
// http://localhost:4000/api/user/login
userRoutes.post("/login", loginUser);
// http://localhost:4000/api/user/logout
userRoutes.post("/logout", logoutUser);
export default userRoutes;