import Friendship from "../models/Friendship.js";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({ message: "Error while fetching user." });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;

    const friendships = await Friendship.find({
      $or: [
        { userA: userId, status: "accepted" },
        { userB: userId, status: "accepted" },
      ],
    });

    const friendIds = friendships.map((friendship) => {
      return userId.equals(friendship.userA)
        ? friendship.userB
        : friendship.userA;
    });

    const userFriends = await User.find({ _id: { $in: friendIds } });

    res.status(200).json({
      success: true,
      friends: userFriends,
    });
  } catch (error) {
    res.status(500).send({ message: "Error while fetching user's friends." });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const existingFriendship = await Friendship.findOne({
      userA: senderId,
      userB: receiverId,
      status: "pending",
    });

    if (existingFriendship) {
      return res.status(400).send({ message: "Friend request already sent." });
    }

    const newFriendship = new Friendship({
      userA: senderId,
      userB: receiverId,
      status: "pending",
    });

    await newFriendship.save();

    res.status(201).json({
      success: true,
      message: "Friend request sent successfully.",
    });
  } catch (error) {
    res.status(500).send({ message: "Friend request failed." });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const friendship = await Friendship.findOneAndUpdate(
      { userA: senderId, userB: receiverId, status: "pending" },
      { status: "accepted" },
      { new: true }
    );

    if (!friendship) {
      return res.status(404).send({ message: "Friend request not found." });
    }

    res.status(200).json({
      success: true,
      message: "Friend request accepted.",
    });
  } catch (error) {
    res.status(500).send({ message: "Friend request acceptance failed." });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const friendship = await Friendship.findOneAndUpdate(
      {
        userA: senderId,
        userB: receiverId,
        status: "pending",
      },
      { status: "rejected" },
      { new: true }
    );

    if (!friendship) {
      return res.status(404).send({ message: "Friend request not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Friend request rejected." });
  } catch (error) {
    res.status(500).send({ message: "Friend request rejection failed." });
  }
};
