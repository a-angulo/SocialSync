import db from "../config/connection.js";
import { Thought, User } from "../models/index.js";
import cleanDB from "./cleanDB.js";
import { thoughts, reactions, users } from "./data.js";

try {
  await db();
  await cleanDB();

  //seed the database with users and thoughts
  const createdUsers = await User.insertMany(users);
  console.log("Users seeded:", createdUsers);

  createdUsers.forEach(async (user) => {
    const userThoughts = thoughts.filter(
      (thought) => thought.username === user.username
    );
    const createdThoughts = await Thought.insertMany(
      userThoughts.map((thought) => ({ ...thought, userId: user._id }))
    );
    console.log(`Thoughts seeded for ${user.username}:`, createdThoughts);
  });

  //seed the database with reactions
  const createdReactions = await Thought.updateMany(
    { username: { $in: users.map((user) => user.username) } },
    { $addToSet: { reactions: { $each: reactions } } }
  );
  console.log("Reactions seeded:", createdReactions);

  // Log out the seed data to indicate what should appear in the database
  console.info("Seeding complete! 🌱");
  process.exit(0);
} catch (error) {
  console.error("Error seeding database:", error);
  process.exit(1);
}
