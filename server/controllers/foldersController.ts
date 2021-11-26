/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Folder from '../models/Folder';
import connectToDatabaseViaLamba from '../util/connectToDatabaseViaLamba';

const foldersController = {
  getFolders: async (req: Request, res: Response) => {
    await connectToDatabaseViaLamba();
    try {
      const result = await Folder.find({ user: req.user._id });
      res.json({
        message: 'success',
        data: result,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
    mongoose.connection.close();
  },
  createFolder: async (req: Request, res: Response) => {
    await connectToDatabaseViaLamba();
    try {
      const result = await new Folder({ name: req.body.name, user: req.user._id });
      await result.save();
      res.json({
        message: 'success',
        data: result,
        id: result._id,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
    mongoose.connection.close();
  },
  updateFolder: async (req: Request, res: Response) => {
    await connectToDatabaseViaLamba();
    const data = {
      name: req.body.name,
    };
    try {
      const result = await Folder.findOneAndUpdate({ _id: req.body.id, user: req.user._id }, data, { new: true });
      res.json({
        message: 'success',
        data: result,
        id: result._id,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
    mongoose.connection.close();
  },
  deleteFolder: async (req: Request, res: Response) => {
    await connectToDatabaseViaLamba();
    try {
      await Folder.findOneAndDelete({ _id: req.body.id, user: req.user._id });
      res.json({ message: 'deleted' });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
    mongoose.connection.close();
  },
};

export default foldersController;
