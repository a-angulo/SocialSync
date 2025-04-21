import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate("thoughts");
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("thoughts");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "User not found!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    if (!username || !email) {
      return res.status(400).json({
        message: "Username and email are required",
      });
    }
    const newUser = await User.create({
      username,
      email,
    });
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.json(deletedUser);
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user, message: "Friend added successfully" });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ user, message: "Friend removed successfully" });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
