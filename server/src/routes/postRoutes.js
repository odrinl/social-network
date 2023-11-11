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

router.get("/get", protect, getAllPosts);
router.post("/create", protect, createPost);
router.delete("/delete", protect, deletePost);
router.put("/edit", protect, editPost);
router.get("/:userId/posts", protect, getUserPosts);

router.put("/:id/like", protect, likePost);

export default router;
