// const express = require('express')
import express from "express";
import connectDb from "./config/db.js";
import todoRoutes from "./Routes/todoRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

let port = 4000;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

app.listen(port, () => console.log("server started"));

// mongodb+srv://bhuvaneshm444_db_user:3t5mdC1v1oG7iIsp@cluster0.89kbhnr.mongodb.net/?appName=Cluster0
