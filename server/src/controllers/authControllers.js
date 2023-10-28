import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists with this email!");
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.json({
      user: newUser,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcryptjs.compare(password, user.password))) {
    res.json({
      user: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

const generateToken = (userId) => {
  const payload = {
    id: userId,
  };
  const options = {
    expiresIn: "10d",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};
