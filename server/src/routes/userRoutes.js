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
  unfriendUser,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:userId", protect, getUser);
router.get("/:userId/friends", protect, getUserFriends);

router.post("/:senderId/:receiverId", protect, sendFriendRequest);
router.delete("/:senderId/:receiverId/cancel", protect, cancelFriendRequest);

router.put("/:senderId/:receiverId/accept", protect, acceptFriendRequest);
router.put("/:senderId/:receiverId/reject", protect, rejectFriendRequest);

router.get("/:userId/nonFriendUsers", protect, getNonFriendUsers);
router.get("/:userId/getAllSentRequests", protect, getAllSentRequests);
router.get("/:userId/getAllReceivedRequests", protect, getAllReceivedRequests);

router.get("/:userId/searchNonFriendsByName", protect, searchNonFriendsByName);

router.delete("/:userId/:friendId/unfriend", protect, unfriendUser);
export default router;
