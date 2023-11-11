import express from "express";
import {
  getAllPosts,
  getUserPosts,
  createPost,
  deletePost,
  editPost,
  likePost,
} from "../controllers/postControllers.js";

const router = express.Router();
router.get("/get", getAllPosts);
router.post("/create", createPost);
router.delete("/delete", deletePost);
router.get("/:userId/posts", getUserPosts);

router.put("/:id/like", likePost);

export default router;
