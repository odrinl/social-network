import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import mongoose from "mongoose";

// Get all posts
export const getAllPosts = asyncHandler(async (req, res) => {
  // Find all users and their posts
  const users = await User.find().populate("posts");

  // Extract and flatten all posts from users
  const allPosts = users.reduce((posts, user) => posts.concat(user.posts), []);

  res.status(200).json({ success: true, posts: allPosts });
});

// Controller to get all posts of a specific user
export const getUserPosts = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const userPosts = user.posts; // Assuming "posts" is the array of embedded posts

  res.status(200).json({ success: true, posts: userPosts });
});

export const likePost = () => null;

export const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id; // Assuming you have user information in req.user

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Create a new post object
  const newPost = {
    username: user.username,
    text,
    images: [], // You can add images here if needed
    timestamp: new Date(),
  };

  user.posts.push(newPost);
  await user.save();

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post: { ...newPost },
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid postId");
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find the post with the given id and remove it from the user's posts
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { posts: { _id: id } } },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
    post: { ...updatedUser },
  });
});
