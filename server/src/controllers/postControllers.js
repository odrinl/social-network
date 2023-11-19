import asyncHandler from "express-async-handler";
import Friendship from "../models/Friendship.js";
import User from "../models/User.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

// Get all posts
export const getAllPosts = asyncHandler(async (req, res) => {
  // Find all users and their posts
  const users = await User.find().populate("posts");

  // Extract and flatten all posts from users
  const allPosts = users.reduce((posts, user) => posts.concat(user.posts), []);

  res.status(200).json({ success: true, posts: allPosts });
});

// Get all posts of user's friends
export const getFriendsPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  const user = await User.findById(userId);

  const friendships = await Friendship.find({
    $or: [
      { userA: ObjectId(userId), status: "accepted" },
      { userB: ObjectId(userId), status: "accepted" },
    ],
  });

  const friendIds = friendships.map((friendship) => {
    return userId === friendship.userA.toString()
      ? friendship.userB
      : friendship.userA;
  });

  // Fetch posts for each friend
  const allFriendsPosts = await Promise.all(
    friendIds.map(async (friendId) => {
      // Find each friend and retrieve their posts
      const friend = await User.findById(friendId);

      if (!friend) {
        return [];
      }

      // Return the friend's posts
      return friend.posts;
    })
  );

  // Add user's posts to the array
  allFriendsPosts.push(user.posts);

  // Flatten the array of arrays into a single array of posts
  const friendsPosts = allFriendsPosts.flat();

  res.status(200).json({ success: true, posts: friendsPosts });
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
  const { userId, text } = req.body;

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
  const { userId, id } = req.body;

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

export const editPost = asyncHandler(async (req, res) => {
  const { userId, id, text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid postId");
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find the post with the given id and update its text
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, "posts._id": id },
    { $set: { "posts.$.text": text } },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Retrieve the updated post
  const updatedPost = updatedUser.posts.find((post) => post._id.equals(id));

  res.status(200).json({
    success: true,
    message: "Post edited successfully",
    post: { ...updatedPost.toObject() },
  });
});
