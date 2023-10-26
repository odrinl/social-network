import express from "express";
import {
  getAllPosts,
  getUserPosts,
  likePost,
} from "../controllers/postControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllPosts);
router.get("/:userId/posts", protect, getUserPosts);

router.put("/:id/like", protect, likePost);

export default router;
