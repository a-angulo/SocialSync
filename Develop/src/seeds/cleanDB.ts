import { User, Thought } from '../models/index.js'; // keep .js for ESM

const cleanDB = async (): Promise<void> => {
  try {
    await Thought.deleteMany({});
    console.log('Thoughts collection cleaned.');

    await User.deleteMany({});
    console.log('Deleted all users.');
  } catch (err) {
    console.error('❌ Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;