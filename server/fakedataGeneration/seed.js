import mongoose from "mongoose";
import faker from "faker";
import User from "./models/User.mjs"; // Import your User model using .mjs extension
import Post from "./models/Post.mjs"; // Import your Post model using .mjs extension
import connectDB from "./db.mjs"; // Import your database connection function using .mjs extension

connectDB(); // Connect to the database

const seedUsers = async (numUsers) => {
  const users = [];

  for (let i = 0; i < numUsers; i++) {
    const user = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "your_fake_password", // Replace with a fake password
      profilePhoto: faker.image.avatar(), // Generate a random avatar URL
    });

    await user.save();
    users.push(user);
  }

  return users;
};

const seedPosts = async (numPosts, users) => {
  const posts = [];

  for (let i = 0; i < numPosts; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const post = new Post({
      text: faker.lorem.paragraph(), // Generate a random paragraph of text
      images: [faker.image.imageUrl()],
      user: randomUser._id,
      timestamp: faker.date.recent(),
    });

    await post.save();
    posts.push(post);
  }

  return posts;
};

const numFakeUsers = 10;
const numFakePosts = 20;

(async () => {
  const fakeUsers = await seedUsers(numFakeUsers);
  const fakePosts = await seedPosts(numFakePosts, fakeUsers);
  console.log(
    `Seeded ${fakeUsers.length} fake users and ${fakePosts.length} fake posts.`
  );
  process.exit(0); // Exit the script
})();
