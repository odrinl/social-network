import express from "express";
import {
  getUser,
  getUserFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getUser);
router.get("/:id/friends", protect, getUserFriends);

router.post("/:senderId/receiverId", protect, sendFriendRequest);
router.put("/:senderId/receiverId/accept", protect, acceptFriendRequest);
router.put("/:senderId/receiverId/reject", protect, rejectFriendRequest);

export default router;
