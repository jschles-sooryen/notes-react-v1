import { Request, Response } from 'express';
import Note from '../models/Note';

const notesController = {
  getNotes: async (req: Request, res: Response) => {
    try {
      const results = await Note.findAll({
        where: {
          folderId: req.params.id,
        },
      });
      res.json({
        message: 'success',
        data: results,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  createNote: async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
      folderId: parseInt(req.params.id),
    };

    try {
      const result = await Note.create(data);
      res.json({
        message: 'success',
        data: result,
        id: result.id,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  updateNote: async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
    };

    try {
      await Note.update(data, {
        where: {
          id: req.params.noteId,
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
  deleteNote: async (req: Request, res: Response) => {
    try {
      await Note.destroy({
        where: {
          id: req.params.noteId,
        },
      });
      res.json({ message: 'deleted' });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
};

export default notesController;
