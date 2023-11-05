import express from "express";
import {
  getUser,
  getUserFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getNonFriendUsers,
  getAllSentRequests,
  getAllReceivedRequests,
  searchNonFriendsByName,
  cancelFriendRequest,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getUser);
router.get("/:id/friends", protect, getUserFriends);

router.post("/:senderId/:receiverId", protect, sendFriendRequest);
router.delete("/:senderId/:receiverId/cancel", protect, cancelFriendRequest);

router.put("/:senderId/:receiverId/accept", protect, acceptFriendRequest);
router.put("/:senderId/:receiverId/reject", protect, rejectFriendRequest);

router.get("/:id/nonFriendUsers", protect, getNonFriendUsers);
router.get("/:id/getAllSentRequests", protect, getAllSentRequests);
router.get("/:id/getAllReceivedRequests", protect, getAllReceivedRequests);

router.get("/:id/searchNonFriendsByName", protect, searchNonFriendsByName);
export default router;
