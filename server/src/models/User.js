import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: String,
  text: String,
  images: [String],
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  dateOfBirth: Date,
  nationality: String,
  status: String,
  description: String,
  profilePicture: String,
  posts: [postSchema], // Embed posts within the user schema
});

const User = mongoose.model("User", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["username", "email"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (!userObject.username) {
    errorList.push("Username is a required field");
  }

  if (!userObject.email) {
    errorList.push("Email is a required field");
  }

  return errorList;
};

export default User;
