import express from "express";
import multer from "multer";
import User from "../models/User.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/uploadImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload-profile-picture/:userId",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      user.profilePicture = req.file.filename;
      await user.save();

      res.json({ success: true, profilePictureUrl: user.profilePicture });
    } catch (error) {
      res.status(500).send({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
