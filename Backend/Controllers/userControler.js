import Users from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  console.log(req.body)

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const userExists = await Users.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await Users.create({
    userName,
    email,
    password: encryptedPassword,
  });

  if (user) {
    return res.status(201).json({ user }); 
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      message: "Login successful",
      data: {
        name: user.userName,
        email: user.email,
        _id: user._id,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
  });
  res.json({ message: "Logout successful" });
};
export { registerUser, loginUser, logoutUser };
