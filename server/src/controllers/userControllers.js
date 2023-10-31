import Friendship from "../models/Friendship.js";

export const getUser = () => ({});
export const getUserFriends = () => [];

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
