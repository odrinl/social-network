import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getUser);
router.get("/:id/friends", protect, getUserFriends);

router.put("/:id/:friendId", protect, addRemoveFriend);

export default router;
