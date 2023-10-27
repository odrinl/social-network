import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: String,
  images: [String], // image URLs or paths , public/assets (not sure)
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
