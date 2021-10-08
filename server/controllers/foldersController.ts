/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import Folder from '../models/Folder';

const foldersController = {
  getFolders: async (req: Request, res: Response) => {
    try {
      const result = await Folder.find({});
      res.json({
        message: 'success',
        data: result,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  createFolder: async (req: Request, res: Response) => {
    try {
      const result = await new Folder({ name: req.body.name });
      await result.save();
      res.json({
        message: 'success',
        data: result,
        id: result._id,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  updateFolder: async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
    };
    try {
      const result = await Folder.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json({
        message: 'success',
        data: result,
        id: result._id,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  deleteFolder: async (req: Request, res: Response) => {
    try {
      await Folder.findByIdAndDelete(req.params.id);
      res.json({ message: 'deleted' });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
};

export default foldersController;
