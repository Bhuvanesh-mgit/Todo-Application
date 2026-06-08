import userModel from "../Model/userModel.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token = req.cookies?.jwt;
  try {
    const decoded = await jwt.verify(token, "secretkey");
    let user = await userModel.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { protect };
