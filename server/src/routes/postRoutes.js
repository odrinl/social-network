import express from "express";
import {
  getAllPosts,
  getUserPosts,
  getFriendsPosts,
  createPost,
  deletePost,
  editPost,
  likePost,
} from "../controllers/postControllers.js";

const router = express.Router();
router.get("/get", getAllPosts);
router.get("/:userId/friends-posts", getFriendsPosts);
router.post("/create", createPost);
router.delete("/delete", deletePost);
router.put("/edit", editPost);
router.get("/:userId/posts", getUserPosts);

router.put("/:id/like", likePost);

export default router;
