import { Request, Response } from 'express';
import Folder from '../models/Folder';

const foldersController = {
  getFolders: async (req: Request, res: Response) => {
    try {
      const results = await Folder.findAll();
      res.json({
        message: 'success',
        data: results,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  createFolder: async (req: Request, res: Response) => {
    try {
      const result = await Folder.create({ name: req.body.name });
      res.json({
        message: 'success',
        data: result,
        id: result.id,
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
      await Folder.update(data, {
        where: {
          id: req.params.id,
        },
      });
      res.json({
        message: 'success',
        data,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  deleteFolder: async (req: Request, res: Response) => {
    try {
      await Folder.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json({ message: 'deleted' });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
};

export default foldersController;
