import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find().populate("reactions");
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId).populate("reactions");
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: "Thought not found!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username, userId } = req.body;
  try {
    if (!thoughtText || !username || !userId) {
      return res.status(400).json({
        message: "Thought text and username are required",
      });
    }
    const newThought = await Thought.create({
      thoughtText,
      username,
    });
    await User.findByIdAndUpdate(userId, {
      $addToSet: { thoughts: newThought._id }, 
    });
    return res.status(201).json(newThought);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );
    if (updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({
        message: "Thought not found!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (deletedThought) {
      await User.findOneAndUpdate(
        {
          username: deletedThought.username,
        },
        {
          $pull: { thoughts: thoughtId },
        }
      );
      res.json(deletedThought);
    } else {
      res.status(404).json({
        message: "Thought not found!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  try {
    if (!reactionBody || !username) {
      return res.status(400).json({
        message: "Reaction body and username are required",
      });
    }
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );
    if (updatedThought) {
      return res.json(updatedThought);
    } else {
      return res.status(404).json({
        message: "Thought not found!",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId: reactionId } } },
      { new: true }
    );
    if (updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({
        message: "Thought not found!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
