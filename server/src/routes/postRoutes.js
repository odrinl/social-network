import express from "express";
import {
  getAllPosts,
  getUserPosts,
  createPost,
  deletePost,
  likePost,
} from "../controllers/postControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", protect, getAllPosts);
router.post("/create", protect, createPost);
router.delete("/delete", protect, deletePost);
router.get("/:userId/posts", protect, getUserPosts);

router.put("/:id/like", protect, likePost);

export default router;
